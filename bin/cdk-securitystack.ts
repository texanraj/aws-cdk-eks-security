#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkSecuritystackStack } from '../lib/cdk-securitystack-stack';

const app = new cdk.App();
new CdkSecuritystackStack(app, 'CdkSecuritystackStack');
