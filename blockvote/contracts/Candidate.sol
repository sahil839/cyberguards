pragma solidity >=0.4.22 <0.6.0;
// import "./Voter.sol";

contract Candidate{
    struct candidateInfo{
        uint256 aadhaar;
        DateTime dob;
        string name;
        int ward;
        bool hasPoliceCase;
        string partySymbol;
        bool isApproved;
        int count;
    }
    struct DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
    }
    candidateInfo candidateDetails;
    address private candidateFactory;
    address public voterAddress;
    address ballotaddress;
    
    constructor(uint256 aadhaar, uint8 day, uint8 month, uint16 year, string memory name, int ward, bool hasPoliceCase, string memory partySymbol, address _voterAddress,address _ballotaddress) public {
        candidateDetails.aadhaar = aadhaar;   
        candidateDetails.dob.day = day;
        candidateDetails.dob.year = year;
        candidateDetails.dob.month = month;
        candidateDetails.name = name;
        candidateDetails.ward = ward;
        candidateDetails.count = 0;
        candidateDetails.hasPoliceCase = hasPoliceCase;
        candidateDetails.partySymbol = partySymbol;
        candidateDetails.isApproved = true;
        voterAddress = address(_voterAddress);
        ballotaddress = address(_ballotaddress);
    }
    
    function displayParty() public view restrictedByVoter returns(string memory){
        return candidateDetails.partySymbol;
    }
    
    function setCandidateFactory(address _candidateFactory) public{
        candidateFactory = address(_candidateFactory);
    }
    
    //This must be called only by ballot
    function incCount() public restrictedByBallot{
        candidateDetails.count++;
    }
    
    function returnCandidateInfo() public view returns(string memory, uint256, string memory){
        return (candidateDetails.name,candidateDetails.aadhaar, candidateDetails.partySymbol);
    }

    function returnAddress() public view returns (address){
        return address(this);
    }
    
    function returnvotecount() public view returns(int){
        return candidateDetails.count;
    }
    
    modifier restricted() {
        require(msg.sender == candidateFactory, "Must be created by factory in Candidate");
        _;
    }
    modifier restrictedByVoter() {
        require(msg.sender == voterAddress, "Must be accessed by voter in Candidate");
        _;
    }
    
    modifier restrictedByBallot() {
        require(msg.sender == ballotaddress, "Count must be increased by ballot");
        _;
    }

}