
# Bamboo plugin

Bamboo plugin will allow you to trigger builds and check their results from a Clarive instance.

## What is Bamboo

Bamboo is a continuous integration (CI) and delivery tool server that can be used to automate the release management for a software application, creating a continuous delivery pipeline.

Bamboo schedules and coordinates the work involved in building and testing your application.

## Requirements

There are no requirements in order for it to work properly.

## Installation

To install the plugin, place the cla-bamboo-plugin folder inside the `CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to Use

Once the plugin is correctly installed, you will have a new palette service called 'Bamboo trigger', and two new Resources, 
one for the Bamboo server, and the other for the Bamboo plans.

### Bamboo Server Service:

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

### Bamboo Project Service:

Here you can configure the parameters for the project in Bamboo:

- **Server** - Choose the Bamboo server where the project is located. 
- **Project key** - Enter project key to be able to trigger builds from Clarive.
- **Plan key** - Plan key to be able to trigger builds from Clarive.

Configuration example:

    Server: Bamboo-Server
    Project key: PROJ1
    Plan key: PLAN1

### Bamboo Trigger Service:

This palette service will let you choose the option that you wish to perform with Bamboo.
The various parameters from the palette service are:

- **Options** - Here you can choose if you want to trigger a build or obtain a result from one. 
- **Bamboo plan** - Choose the Bamboo plan where you wish to perform the selected option.
- **Build Number** - You can select a specific build number to check.
- **Timeout (seconds)** - Time for the service to stop looking for the build number or triggering a build. 10 seconds by default. 
- **Refresh time (seconds)** - Wait time between attempts to obtain build number or trigger a build. One second by default.

For Build options, the service output will be the build number for the plan. In order to obtain the result option, the output will be the result of the build.

Configuration example:

    Option: Build
    Bamboo plan: BambooPlan-CI
    Timeout (seconds): 10
    Refresh time (seconds): 10

## Variables:

In order to use some comboboxes or texfields options from some services, you will need to use variables created in the Variable Resource from Clarive so you can use them more time on an easier way than repeating it every time.

There are different Variables types (value, CI, textArea, array, etc), all of the in the Resource Variable. The CI type is usefull for the ciComboBoxes, as you will not be able to manually write them into the combobox, but yes in the texfields.

The CI variable should be created with the following parameters:

- **Type -** CI. 
- **CI Role -** Select the Role of the CI class you have in the comboBox. 
- **CI CLASS -** Select the specific CI Class it will use, usually the same class as the comboBox where you want to make it appear.

## Common errors

Here we will explain some errors that you can have and how to try to fix them.

You can get an error about non existing CI, so check you have chosen the correct CI in the palette service, and in the Bamboo plan Resource

You can get a timeout error if the server is down, or the service is not reaching the correct url.
To fix it, check that the server is up, and the Bamboo server parameters are correct, and do the same for the Bamboo plan parameters.

The error can be also because the build did not finish, or you set an incorrect build number to check, so check if it is the correct number.
