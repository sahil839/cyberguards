pragma solidity >=0.4.22 <0.6.0;
import "./Candidate.sol";

contract CandidateFactory{
    address private owner=address(0x304e43E858FC4E90dd04F0A4B6AeC45E2B0acEFd); // Admin Address
    address private voterFactoryAddress;
    // mapping(uint256=>address) candidatesList2;
    mapping(int=>address[]) candidatesList;
    address ballotAddress;
    
    constructor() public restricted{
    }

    function setVoterFactoryAddress(address _voterFactoryAddress) public restricted{
        voterFactoryAddress = address(_voterFactoryAddress);
    }
    
    function setBallotAddress(address _ballotAddress) public restricted{
        ballotAddress = address(_ballotAddress);
    }
    
    function createCandidate(uint256 aadhaar, uint8 day, uint8 month, uint16 year, string memory name, int ward, bool hasPoliceCase, string memory partySymbol) public returns(address) {
        require(ballotAddress != address(0x0), "ballotAddress not declared");
        Candidate newCandidate = new Candidate(aadhaar, day, month, year, name, ward, hasPoliceCase, partySymbol, msg.sender, ballotAddress);
        // candidatesList2[aadhaar] = address(newCandidate);
        candidatesList[ward].push(address(newCandidate));
        newCandidate.setCandidateFactory(address(this));
        return address(newCandidate);
    }
    
    function returnCandidateList(int ward) public view returns(address[] memory){
        return candidatesList[ward];
    }
    
    function returnAddress() public view returns (address){
        return address(this);
    }
    
    modifier restricted() {
        require(msg.sender == owner, "Must be owner in Voter");
        _;
    }
    
    modifier restrictedVoterContract() {
        require (voterFactoryAddress != address(0x0), "voterFactoryAddress not set: CandidateFactory");
        require(msg.sender == voterFactoryAddress, "Must be owner in CandidateFactory");
        _;
    }
}