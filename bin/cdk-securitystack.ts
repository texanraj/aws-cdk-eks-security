#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkSecuritystackStack } from '../lib/cdk-securitystack-stack';
import { ClusterStack } from '../lib/cluster-stack';

const app = new cdk.App();
const account = app.node.tryGetContext('account') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT;
const region = app.node.tryGetContext('region') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT;

const primaryRegion = {account, region: 'ap-northeast-2'};


const clusterStack = new ClusterStack(app, 'ClusterStack', {env: primaryRegion});
new CdkSecuritystackStack(app, 'CdkSecuritystackStack', {
    env: primaryRegion,
    cluster: clusterStack.cluster, 
    deployRole: clusterStack.deployRole});
