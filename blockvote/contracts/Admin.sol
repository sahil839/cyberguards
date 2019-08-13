pragma solidity >=0.4.22 <0.6.0;
import "./VoterFactory.sol";

contract Admin{
    struct userInfo{
        uint256 aadhaar;
        DateTime dob; // ddmmyyyy
        string name;
        int ward;
    }
    
    struct DateTime {
        uint16 year;
        uint8 month;
        uint8 day;
    }
    
    uint256[] aadhaarList;
    mapping(uint256=>userInfo) usersList;
    DateTime resultDate;
    string electionName;
    address private owner=address(0x4c6691638e041B55D3CD7564dF2c01e67F0cF15F);
    address public voterFactory;
    address[] private voterList;
    
    constructor(uint8 day, uint8 month, uint16 year, string memory name) public restricted{
        resultDate.day = day;
        resultDate.month = month;
        resultDate.year = year;
        electionName = name;
    }
    
    function isEligible(uint256 aadhaar) public view restricted returns(bool){
        return (resultDate.year - usersList[aadhaar].dob.year > 18);
    }
    
    function returnAddress() public view returns (address){
        return address(this);
    }
    
    function addUserData(uint256 aadhaar, uint8 day, uint8 month,uint16 year, string memory name, int ward) public restricted{
        DateTime memory dob = DateTime(year, month, day);
        userInfo memory user = userInfo(aadhaar, dob, name, ward);
        usersList[aadhaar] = user;
        aadhaarList.push(aadhaar);
    }
    
    function createVoter(uint256 aadhaar) public restricted returns(address){
        require(voterFactory != address(0x0), "VoterFactory not set");
        require(isEligible(aadhaar), "Under 18");
        userInfo memory user=usersList[aadhaar];
        VoterFactory _voterFactory = VoterFactory(voterFactory);
        return _voterFactory.createVoter(user.aadhaar, user.dob.day, user.dob.month, user.dob.year, user.name, user.ward);
    }
    
    function createVoters() public restricted returns(address[] memory){
        for (uint8 i=0; i<aadhaarList.length; i++){
            voterList.push(createVoter(aadhaarList[i]));
        }
        return voterList;
    }
    
    function setVoterFactory(address _voterFactory) public restricted{
        voterFactory = address(_voterFactory);
    }
    
    modifier restricted() {
        require(msg.sender == owner, "Must be owner");
        _;
    }
    
}

// 1001, 23,11,2005, "MR", 1
//  1001, 23,11, 1998, "MR", 1
// 1002,12,9,1997,"GG", 1
// 1003,13,5,1994,"SB", 2
// 25, 11, 2019, "First"