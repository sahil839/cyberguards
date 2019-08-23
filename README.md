# Cyberguards

## Problem Statement:

One of the most common problem faced by the voters during the election period is that in order to cast their vote, they have to travel to their 
native places, which is often cumbersome, time consuming and leads to compromise with their work hours and unnecessary expenses of the travel.
Another problem during the election period, is that, every year there are thousands of new voters added into the system, and the process of registering these new
voters is often time and resource consuming.

Imagine how efficient and convenient it woule be if their is just single window of clearance for vote casting, candidate verification, and all the
other knitty-gritty of the election, because often voters as well as the candidates have to go through long sruitnizing process in order to take
part in the elections. Security and reliability often plays a major role in the election process, infact it is one of the most important feature
which must be taken care of during the elections.

The vote counting is another phase of election which takes a lot of time and human resource. Automating this vote counting process is one of the 
most demanding thing right now. Also, often results are declared after a considerable amount of time after elections are over. Automating this result display
process is also one of the most important feature on which we chose to work upon.

## Proposed Solution:

###### Remote Voting Mechanism

We will create an application on blockchain which will allow the voter to vote in his constituency **remotely** from anywhere. As the **voter details will be
fetched from Aadhar Card** of the voter, so he won't be able to change these details, if he wants to change the details, he has to contact ot the admin which, in our
case is the authority responsible for conducting these elections.

###### Automatic Voter Registeration

As soon as the admin contract will be deployed by the election conducting authority, **all the voter accounts will be automatically created on the basis of their
Aadhaar card details**. In this way we will automate the voter registeration process. Also during the time of voting, the eligibility of the voter will also be
checked from his aadhaar details.

###### Aadhaar+OTP for voting

At the time of voting, as soon as a particular voter wants to vote, he/she has to **enter only his aadhaar number**, the deployed contract, will then **send an OTP password
on the registered mobile number** of the voter. Through this, we are providing a single window clearance to the voter.

###### Easy Candidate registeration process

All a candidate has to do in order to contest the elections, is just provide his details like manifesto and income proof and party name, and Voila!!, a candidate is 
registered, **all the further srutnizing process will be taken care by the backend**, and the candidate don't have to worry about anything.

###### Automatic vote counting

All the votes casted in favour of a particular candidate will be **counted in real-time and maintained at the database**, whose access is only to the admin.
As soon as the election process is over, the **results will be declared automatically, according to the date set by the admin.**

###### Security and Reliability

The security and reliability will be maintained by ensuring all the ethical procedure is followed. No voter less than 18 years will be able to cast his/her vote.
No two candidates from the same party can contest in the same constituency, and no person can vote more than once.
