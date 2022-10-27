// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//@ title: Evaluation System

contract EvaluationSystem {

  address public professor;

  // Student data
  struct Students {
    string name;
    string id;
    uint grades;
  }

  Students[] liststudents;

  mapping(string => Students) dataStudents;

  //list of students requesting revision
  string[] revision;

 // Event evaluated students
  event EvaluatedStudent(string name); 

  //event to check grades
  event ReviewNote(string id); 

  constructor ()  {

    professor = msg.sender;
  }

  //gas optimization
  function unsafe(uint x) internal pure returns(uint){
    unchecked {
       return x + 1;
    }
  }
  
  // Teacher only modifier
  modifier onlyteacher(address teachAddr) {
    require(msg.sender == professor,"You dont have permissions!");
    _;
  }

  //function to evaluate
  function evaluate(string calldata _name, string calldata _id, uint256 _grades) public onlyteacher(msg.sender) {
    
    // We optimize gas running a new Students array, outside the EVM
    Students[] memory newliststudents = liststudents;
    for(uint256 i = 0; i < newliststudents.length; i = unsafe(1)){
      require(keccak256(abi.encodePacked(_id)) != keccak256(abi.encodePacked(newliststudents[i].id)),"The student is already evaluated!");
    }
    liststudents.push(Students(_name, _id, _grades));
    dataStudents[_id] = Students(_name, _id, _grades);

    // emit event evaluated student
    emit EvaluatedStudent( _name);
  }

  //fuction for the student to see his grades
  function seeGrades(string calldata _id) public view returns(Students memory) {
    return dataStudents[_id]; 
  }

  //function where the student requests revision of the notes
  function sheckGrades(string memory _id) public {
    // We optimize gas by declaring a new revision array and then traversing it
    string[] memory newrevision = revision; 
    for(uint i = 0; i < newrevision.length; i = unsafe(i)){
      require(keccak256(abi.encodePacked(newrevision[i])) != keccak256(abi.encodePacked(_id)),"You already asked for review!");
    }
    revision.push(_id);
    emit ReviewNote(_id);
  }

    //function that allows the teacher to see the students who have requested revision of grades
    function Revision() public view onlyteacher(msg.sender) returns(string[] memory) {
      return revision;
    }
}
