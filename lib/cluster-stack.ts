import * as cdk from '@aws-cdk/core';
import * as iam from '@aws-cdk/aws-iam';
import * as eks from '@aws-cdk/aws-eks';
import { PhysicalName } from '@aws-cdk/core';
import { readYamlFromDir } from '../utils/read-file';



export class ClusterStack extends cdk.Stack {
  public readonly cluster: eks.Cluster;
  public readonly deployRole: iam.Role;

  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props);

    const clusterAdmin = new iam.Role(this, 'AdminRole', {
      assumedBy: new iam.AccountRootPrincipal()
    });

    const cluster = new eks.Cluster(this, 'opa-cluster', {
      clusterName: 'opa-demo',
      version: eks.KubernetesVersion.V1_17,
      mastersRole: clusterAdmin,
      defaultCapacity: 2
    });
    
    readYamlFromDir('./yaml/', cluster);

    this.cluster = cluster;
    this.deployRole = createDeployRole(this, `deploy-to-eks`, cluster);
    
    
  }
}

function createDeployRole(scope: cdk.Construct, id: string, cluster: eks.Cluster): iam.Role {
  const role = new iam.Role(scope, id, {
    roleName: PhysicalName.GENERATE_IF_NEEDED,
    assumedBy: new iam.AccountRootPrincipal()
  });
  cluster.awsAuth.addMastersRole(role);

  return role;
}


export interface SecurityProps extends cdk.StackProps {
  cluster: eks.Cluster,
  deployRole: iam.Role
}