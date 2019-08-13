pragma solidity >=0.4.22 <0.6.0;
import "./CandidateFactory.sol";
import "./Candidate.sol";

contract Voter{
    struct voterInfo{
        uint256 aadhaar;
        DateTime dob;
        string name;
        int ward;
        bool hasVoted;
        bool isCandidate;
        address candidateAddress;
    }
    
    struct DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
    }
    
    voterInfo voterDetails;
    address public candidateFactory;
    address public voterFactory;
    address public ballotaddress;
    // uint256[] candidateList;
    // address[] candidateAddressList;
    
    
    constructor(uint256 aadhaar, uint8 day, uint8 month, uint16 year, string memory name, int ward,address _candidateFactoryAdd, address _voterFactoryAdd,address _ballotadd) public{
        voterDetails.aadhaar = aadhaar;   
        voterDetails.dob.day = day;
        voterDetails.dob.year = year;
        voterDetails.dob.month = month;
        voterDetails.name = name;
        voterDetails.ward = ward;
        voterDetails.hasVoted = false;
        voterDetails.isCandidate = false;
        candidateFactory = _candidateFactoryAdd;
        voterFactory = _voterFactoryAdd;
        ballotaddress = address(_ballotadd);
    }
    
    function becomeCandidate(bool hasPoliceCase, string memory partySymbol) public returns(address){
        require(candidateFactory != address(0x0), "CandidateFactory not set");
        CandidateFactory _candidateFactory = CandidateFactory(candidateFactory);
        voterDetails.candidateAddress = address(_candidateFactory.createCandidate(voterDetails.aadhaar, voterDetails.dob.day, voterDetails.dob.month, voterDetails.dob.year, voterDetails.name, voterDetails.ward, hasPoliceCase, partySymbol));
        return address(voterDetails.candidateAddress);
    }

    //This function must be called only by ballot
    function vote() public restrictedOnVoting{
        require(canVote() == true, "User has already voted");
        voterDetails.hasVoted = true;
    }

    function canVote() public view returns (bool){
        if (voterDetails.hasVoted)
            return false;
        return true;
    }

    function displayAadhaar() public view returns(uint256){
        return voterDetails.aadhaar;
    }
    
    function displayHasVoted() public view returns(bool){
        return voterDetails.hasVoted;
    }
    
    function returnAddress() public view returns (address){
        return address(this);
    }
    
    modifier restricted() {
        require(msg.sender == voterFactory, "Must be created by factory in Voter");
        _;
    }
    
    modifier restrictedOnVoting(){
        require(msg.sender == ballotaddress, "Voting can be only done through ballot");
        _;
    }
}