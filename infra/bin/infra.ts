#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { S3StaticSite } from '../lib/s3-static-site';
import * as path from "node:path";

class StaticSiteStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new S3StaticSite(this, 'StaticWebsiteConstruct', {
      buildPath: path.join(__dirname, '..', '..', 'dist'),
      // indexDocument: 'index.html'
    })
  }
}

const app = new cdk.App();

new StaticSiteStack(app, 'StaticWebsiteStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  },
});

app.synth();