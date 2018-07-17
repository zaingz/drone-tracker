Overview
=============

This repository contains the source code of resin.io coding task.

To develop a drone tracking system micro-services architecture is used.
There are four main services of this system.

 1. NSQ
 2. Dumper
 3. Dashboard Backend
 4. Dashboard Frontend


### Installation:


To run all of these services use:

	docker-compose up


and to simulate the drones

	cd drone-simulator
	npm i && npm start


#### Visit the dashboard: **http://localhost:3000**



# Architecture of application

The application flow begins when a drone sends the message. It is assumed that there can be hundreds of drones flying at the same time. So they report/send their data to the **NSQ service**. The reason NSQ is used in this scenario is that each drone sending real-time data should be processed in a way that it doesn't overwhelm the system. NSQ is a realtime distributed messaging platform. It is horizontally scaleable and supports low-latency push based message delivery. Thus it is capable of managing all the incoming data from drones.

Next service is data dumping service called **dumper**.  dumper consumes the messages from NSQ and process them and dump them into redis. Redis is chosen because of it high speed and performance. IMO Redis is ideal for this kind of scenario and data can be persisted on the disk if required.  
Redis keep record of all the locations sent by each drone and also maintains a hash representing the latest state of drone. Currently this service assumes that drone which aren't sending the location for more then 2 minutes are inactive.

Third service is the **dashboard-backend**. This service is the API for the frontend. There is only one end point - /data. This returns the list of active drones fetched from the redis. This service also marks the drones *inactive* if there location is unchanged for last 10 seconds.

Last but not least is the **dashboard-frontend** service. This is a react app bootstrapped from create-react-app. This displayed the active drones list in a table. It polls the data every second and highlight the static drones. Redux is also used to keep code maintainable and scaleable.

Finally there is **drone-simulator** script. It can be run independently. This simulates a set of drone sending the data to NSQ. (*The location parameter can be kept constant in this script to mimic a not moving drone.* )

---------------------------------------
##### Written by Zain Bin Zafar zaing.143@gmail.com, July 2018.
