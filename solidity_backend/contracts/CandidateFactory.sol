pragma solidity >=0.4.22 <0.6.0;
import "./Candidate.sol";

contract CandidateFactory{
    address private owner=address(0x2b8636b4Ba684488E7b4679139E0d79662B90825); // Admin Address
    address private voterFactoryAddress;
    // mapping(uint256=>address) candidatesList2;
    mapping(int=>address[]) candidatesList;
    mapping(int=>string[]) partyList;
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
        require(checkIfPartyExists(ward, partySymbol) != true, "Party already exists");
        Candidate newCandidate = new Candidate(aadhaar, day, month, year, name, ward, hasPoliceCase, partySymbol, msg.sender, ballotAddress);
        // candidatesList2[aadhaar] = address(newCandidate);
        candidatesList[ward].push(address(newCandidate));
        partyList[ward].push(partySymbol);
        newCandidate.setCandidateFactory(address(this));
        return address(newCandidate);
    }

    function checkIfPartyExists(int ward, string memory partySymbol) public view returns(bool){
        for (uint256 i=0; i<partyList[ward].length; i++){
            string memory symbol = partyList[ward][i];
            if (keccak256(abi.encodePacked((symbol))) == keccak256(abi.encodePacked((partySymbol)))) return true;
        }
        return false;
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