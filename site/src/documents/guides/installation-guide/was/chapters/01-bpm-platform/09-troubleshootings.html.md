---

title: 'Troubleshootings'
category: 'BPM Platform'

---


## Defining WebShere Resources in the right scope

When installing the camunda BPM platform Application, you may see error messages indicating that you are referencing resources from the wrong scope. Make sure you define the jobexecutor resources in the right scope. Make sure you understand the IBM WebSphere management concepts "Cell", "Node" and "Server".


## Known Issue - Exception when creating an initial user profile

At cycle login you may get an error when trying to setup an initial user profile. The Exception contains the following error message: java.lang.VerifyError in class org/springframework/aop/aspectj/MethodInvocationProceedingJoinPoint. This is a known bug in WebSphere v. 8.5.5. Download the fix package 8.5.5.0-WS-WASProd-IFPM90932 from the IBM support center and install it via the IBM Installation Manager.