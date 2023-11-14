#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { FlaskEcsRedisStack } from '../lib/flask-ecs-redis-stack';

const app = new cdk.App();
new FlaskEcsRedisStack(app, 'FlaskEcsRedisStack');
