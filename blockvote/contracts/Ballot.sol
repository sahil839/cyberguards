pragma solidity >=0.4.22 <0.6.0;
import "./CandidateFactory.sol";
import "./Voter.sol";

contract Ballot{
    address candidateFactoryAddress;
    struct candidateDetails{
        string name;
        uint256 aadhar;
        string partyname;
    }
    candidateDetails[] public candidateList;
    address[] candidateAddressList;
    address admin = address(0x304e43E858FC4E90dd04F0A4B6AeC45E2B0acEFd);
    
    constructor() public restricted{
        // candidateDetails memory d;
        // d.name="mayank";
        // d.aadhar=1000;
        // d.partyname="bjp";
        // candidateList.push(d);
        // d.name="raj";
        // d.aadhar=1001;
        // d.partyname="bjd";
        // candidateList.push(d);
    }

    function setCandidateFactory(address _candidateFactory) public{
        candidateFactoryAddress = address(_candidateFactory);
    }
    
    function fetchList(int ward) public returns(uint256){
        CandidateFactory factory = CandidateFactory(candidateFactoryAddress);
        candidateAddressList = factory.returnCandidateList(ward);
        return createCandidateList();
    } 

    function createCandidateList() public returns(uint256){
        uint256 size = candidateAddressList.length;
        for(uint8 i=0;i<size;i++)
        {
            Candidate object = Candidate(candidateAddressList[i]);
            candidateDetails memory d;
            (d.name, d.aadhar, d.partyname)  = object.returnCandidateInfo();
            candidateList.push(d);
        }
        return (candidateList.length);
    }
    
    function vote(address candidate, address voter) public{
        Candidate c = Candidate(candidate);
        Voter v = Voter(voter);
        v.vote();
        c.incCount();
    }
    
    function displayelected(int ward) public view returns(address){
        address[] memory wardlist;
        CandidateFactory factory = CandidateFactory(candidateFactoryAddress);
        wardlist = factory.returnCandidateList(ward);
         uint256 size = wardlist.length;
         int max=0;
         address returning_address;
        for(uint8 i=0;i<size;i++)
        {
            Candidate object1 = Candidate(wardlist[i]);
            if(object1.returnvotecount() > max)
            {
                max = object1.returnvotecount();
                returning_address = wardlist[i];
            }
        }
        return returning_address;
    }
    
    function returnballotaddress() public view returns(address){
        return address(this);
    }
    
    modifier restricted(){
        require(msg.sender == admin, "Must be admin Ballot");
        _;
    }

}