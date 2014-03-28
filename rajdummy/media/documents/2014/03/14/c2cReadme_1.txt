[1. Setup]

--> Install node by using following Commands
	Mac:
	    Install the dependencies:
			Install Xcode.
			Install git.
	    Run the following commands:
			git clone git://github.com/ry/node.git
			cd node
			./configure
			make
			sudo make install
	Ubuntu:
		Install the dependencies:
			sudo apt-get install g++ curl libssl-dev apache2-utils
			sudo apt-get install git-core
		Run the following commands:
			ubuntu_setup.sh
			git clone git://github.com/ry/node.git
			cd node
			./configure
			make
			sudo make install
[2. USAGE]

-->Create a properties text file with the following parameters
	baseBuild:Give the path of crx to take blessedImages
        newBuild:Give the path of crx to get CompareImages
	rootDir:Give the path to create the report contains images,Scripts folders and index.html
	msImageDir:Give the path of msImages Folder
	baseImageDir:Give the path of blessedImages folder.It is used to copy the blessed images after taking blessed images and also to use blessedImages when Compare 		     is running
	testFilesDir:Give the path of test files folder to run C2C.

-->Execution Commands
		- Needs to be executed from command line using the below command
			- To run all (Both blessed and compare)
				python html-office/crx/e2eTests/c2cTests/report/generate_report.py path of properties text file
			- To run only Blessed images run 
				python html-office/crx/e2eTests/c2cTests/report/generate_report.py path of properties text file BLESSED
			- To run only Compare images run
				python html-office/crx/e2eTests/c2cTests/report/generate_report.py path of properties text file COMPARE



[3. UNDERSTANDING EXECUTION FRAMEWORK]

--->They are three different types of C2C runs according to the above given parameters
	-All
		This arragument is to  run both blessed and Compare.it needs two crx's to run c2c.One crx is to take the blessed image and the other is to take the image and compare's with the previous blessed images.After completing the compare according to the difference bewteen the images it will generate a report in the root folder as index.html file.To execute this run you no need to give any parameters after properties.txt in the command line
	-BLESSED
		This arragument  is to  run only blessed Images.it needs only one crx to run c2c.It will just take the screenshoots of each file and copies to the BlessedImages folder 
	-Report
		Report will generate a report(index.html). 
		
		

	
	


