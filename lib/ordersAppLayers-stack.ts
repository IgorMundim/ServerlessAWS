import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import * as ssm from 'aws-cdk-lib/aws-ssm'

export class OrdersAppLayersStack extends cdk.Stack {
   constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props)

      const ordersLayer = new lambda.LayerVersion(this, 'OrdersLayer', {
         code: lambda.Code.fromAsset('lambda/orders/layers/ordersLayer'),
         compatibleRuntime: [lambda.Runtime.NODEJS_16_X],
         layerVersionName: 'OrdersLayer',
         removalPolicy: cdk.RemovalPolicy.DESTROY
      })

      new ssm.StringParameter(this, 'OrdersLayerVersionArn', {
         parameterName: 'OrdersLayerVersionArn',
         stringValue: ordersLayer.layerVersionArn
      })

   }
}