pragma solidity >=0.4.22 <0.6.0;
import "./Voter.sol";

contract VoterFactory{
    address private owner=address(0x304e43E858FC4E90dd04F0A4B6AeC45E2B0acEFd); // Admin address
    address private adminContractAddress;
    address private candidateFactory;
    mapping(uint256=>address) votersList;
    address[] votersAddressList;
    address ballotAddress;
    
    constructor() public restricted{
    }
    
    function setBallotAddress(address _ballotAddress) public restricted{
        ballotAddress = address(_ballotAddress);
    } 
    
    function createVoter(uint256 aadhaar, uint8 day, uint8 month, uint16 year, string memory name, int ward) public restrictedAdminContract returns (address){
        require(candidateFactory != address(0x0), "candidateFactory not declared");
        require(ballotAddress != address(0x0), "ballotAddress not declared");
        Voter newVoter = new Voter(aadhaar, day, month, year, name, ward, candidateFactory, address(this), ballotAddress);
        votersList[aadhaar]=address(newVoter);
        votersAddressList.push(address(newVoter));
        return address(newVoter);
    }
    
    function setAdminAddress(address adminAddress) public restricted{
        adminContractAddress = address(adminAddress);
    }

    function setCandidateFactory(address _candidateFactory) public restricted{
        candidateFactory = address(_candidateFactory);
    }
    
    function returnAddress() public view returns (address){
        return address(this);
    }
    
    function returnVotersList() public view returns (address[] memory){
        return votersAddressList;
    }

    function returnVoterAddress(uint256 aadhaar) public view returns (address){
        return votersList[aadhaar];
    }
    
    modifier restricted() {
        require(msg.sender == owner, "Must be owner in VoterFactory owner");
        _;
    }

    modifier restrictedAdminContract() {
        require (adminContractAddress != address(0x0), "adminContractAddress not set: VoterFactory");
        require(msg.sender == adminContractAddress, "Must be owner in VoterFactory adminContractAddress");
        _;
    }
}