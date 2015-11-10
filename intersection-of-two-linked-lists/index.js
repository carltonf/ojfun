// https://leetcode.com/problems/intersection-of-two-linked-lists/
//
// also see http://www.geeksforgeeks.org/write-a-function-to-get-the-intersection-point-of-two-linked-lists/

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

function countList(head){
  var count = 0;

  while (head){
    count++;
    head = head.next;
  }

  return count;
}

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
  var countA = countList(headA),
      countB = countList(headB),
      countDiff, longerList, shorterList;

  if (countA > countB){
    countDiff = countA - countB;
    longerList = headA;
    shorterList = headB;
  }
  else {
    countDiff = countB - countA;
    longerList = headB;
    shorterList = headA;
  }

  // traverse the countDiff for the longerList
  for(var i = 0; i < countDiff; i++){
    longerList = longerList.next;
  }

  // traverse both lists until reach the same node
  while(longerList){
    if (longerList === shorterList){
      return longerList;
    }

    longerList = longerList.next;
    shorterList = shorterList.next;
  }

  return null;
};
