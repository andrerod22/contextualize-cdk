import * as cdk from '@aws-cdk/core';
import * as ecs from '@aws-cdk/aws-ecs';
import * as ec2 from '@aws-cdk/aws-ec2';
import * as elasticache from '@aws-cdk/aws-elasticache';
import * as ecs_patterns from '@aws-cdk/aws-ecs-patterns';

export class FlaskEcsRedisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', { maxAzs: 3 });

    // Define the ECS Cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc: vpc
    });

    // Define the ECS Task Definition for Flask App and Nginx
    const appTaskDef = new ecs.FargateTaskDefinition(this, 'AppTaskDef', {
      memoryLimitMiB: 512, // Adjust based on your application's needs
      cpu: 256,
    });

    // Add Flask App Container to Task Definition
    const flaskContainer = appTaskDef.addContainer('FlaskAppContainer', {
      image: ecs.ContainerImage.fromRegistry('897946215384.dkr.ecr.us-east-1.amazonaws.com/flask-app-repo:latest'),
      environment: { // Simple environment variables
        'FLASK_ENV': 'development'
      },
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'FlaskApp' }),
    });

    // Port mapping for Flask App
    flaskContainer.addPortMappings({
      containerPort: 5000, // Flask default port
    });

    // Add Nginx Container to Task Definition
    const nginxContainer = appTaskDef.addContainer('NginxContainer', {
      image: ecs.ContainerImage.fromRegistry('897946215384.dkr.ecr.us-east-1.amazonaws.com/nginx-repo:latest'),
      logging: ecs.LogDrivers.awsLogs({ streamPrefix: 'Nginx' }),
    });

    // Port mapping for Nginx
    nginxContainer.addPortMappings({
      containerPort: 80, // Nginx default port
    });

    // Define the ECS Service using an ECS pattern
    const appService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'AppService', {
      cluster: cluster,
      taskDefinition: appTaskDef,
      publicLoadBalancer: true, // Set to true to allow public access
    });

    // Define the Elasticache Redis Cache
    const redisCache = new elasticache.CfnCacheCluster(this, 'RedisCache', {
      cacheNodeType: 'cache.t2.micro',
      engine: 'redis',
      numCacheNodes: 1,
      vpcSecurityGroupIds: ['sg-0f51d4510266b4af4'], // Replace with your VPC security group ID
      cacheSubnetGroupName: 'cdkflasksubnet', // Replace with your cache subnet group name
    });

    // Additional configurations can be added here
  }
}
