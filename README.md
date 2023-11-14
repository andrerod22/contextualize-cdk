# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template


# Flask-ECS-Redis Application

This project deploys a Flask application with Nginx and Redis on AWS ECS using AWS CDK.

## Prerequisites

- AWS CLI
- Docker
- Node.js and npm
- TypeScript
- AWS CDK

## Setup

### Install TypeScript

TypeScript is required for AWS CDK. Install it globally using npm:

```bash
npm install -g typescript

# Install Docker

Docker is used for creating containerized applications. Follow the official guide to install Docker: Docker Installation
AWS Setup

Ensure you have configured AWS CLI with the appropriate credentials and region.
Deployment

To deploy the application, run the following commands:

bash

cdk bootstrap
cdk deploy

After successful deployment, the application will be accessible via the URL provided by the load balancer in your AWS ECS service.
Accessing the Application

To access the Flask web application, use the URL of the load balancer found in the AWS ECS service details in the AWS Management Console.
Additional Information

For more detailed instructions and troubleshooting, refer to the official AWS documentation.

javascript


### `requirements.txt`

Place this file in the `flask-app` folder within the `resources` directory. Here's an example `requirements.txt` for a basic Flask application:

Flask==2.0.1
redis==3.5.3

csharp


### Project Structure

Your project directory should look something like this:

.
├── README.md
├── bin
│ └── ...
├── lib
│ └── ...
├── resources
│ ├── flask-app
│ │ ├── Dockerfile
│ │ ├── app.py
│ │ └── requirements.txt
│ └── nginx
│ └── ...
└── ...