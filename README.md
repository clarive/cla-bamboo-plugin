# Bamboo plugin

<img src="https://cdn.jsdelivr.net/gh/clarive/cla-bamboo-plugin/public/icon/bamboo.svg?sanitize=true" alt="Bamboo Plugin" title="Bamboo Plugin" width="120" height="120">

Bamboo plugin will allow you to trigger builds and check their results from a Clarive instance.

## What is Bamboo

Bamboo is a continuous integration (Resource) and delivery tool server that can be used to automate the release management for a software application, creating a continuous delivery pipeline.

Bamboo schedules and coordinates the work involved in building and testing your application.

## Requirements

There are no requirements in order for it to work properly.

## Installation

To install the plugin, place the cla-bamboo-plugin folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

### Bamboo Server

To configurate the Bamboo Server Resource open:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> Bamboo.

Here you will be able to configure your Bamboo server parameters:

- **Hostname or IP** - Enter the hostname or the IP where the server is located. 
- **Port** - Enter the server port.
- **User** - Username for the authentication.
- **Password** - Password for the authentication.

Configuration example:

    Hostname or IP: 127.0.0.1
    Port: 8085
    User: Clarive
    Password: password

### Bamboo Project

To configurate the Bamboo Project Resource open:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> Bamboo.

Here you can configure the parameters for the project in Bamboo:

- **Server** - Choose the Bamboo server where the project is located. 
- **Project key** - Enter project key to be able to trigger builds from Clarive.
- **Plan key** - Plan key to be able to trigger builds from Clarive.

Configuration example:

    Server: Bamboo-Server
    Project key: PROJ1
    Plan key: PLAN1

### Bamboo Trigger

The various parameters are:

- **Options (variable name: option)** - Here you can choose if you want to trigger a build or obtain a result from one. 
   - **Trigger build ("build")** - Starts a new build for the Bamboo plan.
   - **Get build result ("result")** - Gets the result from a build.
- **Bamboo plan (plan)** - Choose the Bamboo plan where you wish to perform the selected option.
- **Build Number (build_number)** - You can select a specific build number to check.
- **Timeout (seconds) (variable name: timeout)** - Time for the service to stop looking for the build number or triggering a build. 10 seconds by default. 
- **Refresh time (seconds) (variable name: check_time)** - Wait time between attempts to obtain build number or trigger a build. One second by default.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Bamboo Trigger**

For Build options, the service output will be the build number for the plan. In order to obtain the result option, the output will be the result of the build.

Example:

```yaml
    Option: Build
    Bamboo plan: BambooPlan-Resource
    Timeout (seconds): 10
    Refresh time (seconds): 10
``` 

```yaml
    Option: Get build result
    Bamboo plan: BambooPlan-Resource
    Build Number: 12
    Timeout (seconds): 10
    Refresh time (seconds): 10
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Example:

```yaml
rule: Bamboo demo
do:
   - bamboo_trigger:
       option: 'build'          # Required
       plan: 'plan-resource'    # Required. Use the mid set to the resource you created
       timeout: '10'            # Required   
       check_time: '10'         # Required
``` 

```yaml
rule: Yet another Bamboo demo
do:
   - bamboo_trigger:
       option: 'result'         # Required
       plan: 'plan-resource'    # Required. Use the mid set to the resource you created
       timeout: '10'            # Required   
       check_time: '10'         # Required
       build_number: '12'
```

##### Outputs

###### Success

The service will return the console output for the command.

###### Possible configuration failures

**Task failed**

You will get the error from the Bamboo API.

You can get an error about non existing Resource, so check you have chosen the correct Resource in the service, and in the Bamboo plan Resource

You can get a timeout error if the server is down, or the service is not reaching the correct url.
To fix it, check that the server is up, and the Bamboo server parameters are correct, and do the same for the Bamboo plan parameters.

The error can be also because the build did not finish, or you set an incorrect build number to check, so check if it is the correct number.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "bamboo_trigger": "option"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Option` not available for op "bamboo_trigger"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
