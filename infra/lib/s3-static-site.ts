import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import { Construct } from "constructs"

export interface S3StaticSiteProps {
  readonly buildPath: string;
  readonly indexDocument?: string;
}

export class S3StaticSite extends Construct {
  constructor(parent: Construct, name: string, props: S3StaticSiteProps) {
    super(parent, name);

    const indexDoc = props.indexDocument || 'index.html';

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    const distribution = new cloudfront.Distribution(this, "SiteDistribution", {
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(siteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      defaultRootObject: indexDoc
    });

    new s3deploy.BucketDeployment(this, "SiteDeployment", {
      sources: [
        s3deploy.Source.asset(props.buildPath)
      ],
      destinationBucket: siteBucket,
      distribution: distribution,
      distributionPaths: ["/*"]
    })

    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.domainName}`,
      description: 'The URL of the deployed static website',
    });
  }
}