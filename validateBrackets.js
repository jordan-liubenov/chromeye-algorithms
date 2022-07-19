const validateBrackets = (str) => {
  let isValid = true;

  let startingBracket = findStartingBracket(str);
  let endingBracket = findEndingBracket(str);

  if (!compareOuterBracketTypes(startingBracket, endingBracket)) {
    //if outer-most brackets are not of same type, str is invalid
    return false;
  }

  //if the outer brackets are "small", return invalid if any other brackets are found in string
  if (startingBracket == "(") {
    for (let i = 0; i < str.length; i++) {
      if (str[i] == "{" || str[i] == "[") {
        return false;
      }
    }
  }

  if (startingBracket == "{") {
    isValid = largestOuterBracketCase(str);
    return isValid;
  }

  if (startingBracket == "[") {
    isValid = mediumOuterBracketCase(str);
    return isValid;
  }
};

function findStartingBracket(str) {
  let bracket = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "{" || str[i] == "[" || str[i] == "(") {
      bracket = str[i];
      break;
    }
  }
  return bracket;
}

function findEndingBracket(str) {
  let bracket = "";
  for (let i = str.length - 1; 0 < i; i--) {
    if (str[i] == "}" || str[i] == "]" || str[i] == ")") {
      bracket = str[i];
      break;
    }
  }
  return bracket;
}

function compareOuterBracketTypes(startingBracket, endingBracket) {
  //check if the outer-most left and right bracket in current string are of the same type
  let correctType = true;

  if (startingBracket == "{" && endingBracket != "}") {
    correctType = false;
  } else if (startingBracket == "[" && endingBracket != "]") {
    correctType = false;
  } else if (startingBracket == "(" && endingBracket != ")") {
    correctType = false;
  }

  return correctType;
}

function largestOuterBracketCase(str) {
  //in case of outer brackets being the large "{}"

  let tempStr = str.replace("{", "");
  tempStr = tempStr.replace("}", "");

  let startingBracket = findStartingBracket(tempStr);
  let endingBracket = findEndingBracket(tempStr);

  if (!compareOuterBracketTypes(startingBracket, endingBracket)) {
    return false;
  }

  if (startingBracket == "[") {
    //if the next pair of brackets are the medium "[]" brackets

    //remove the current outer "[]" brackets
    tempStr = tempStr.replace(startingBracket, "");
    tempStr = tempStr.replace(endingBracket, "");

    startingBracket = findStartingBracket(tempStr); //find last pair of brackets which will be "()"
    endingBracket = findEndingBracket(tempStr);

    if (!compareOuterBracketTypes(startingBracket, endingBracket)) {
      return false;
    }

    if (startingBracket == "(" && endingBracket == ")") {
      if (!compareOuterBracketTypes(startingBracket, endingBracket)) {
        return false;
      } else {
        return true;
      }
    } else if (startingBracket == "" && endingBracket == "") {
      //if there are no other bracket pairs
      return true;
    } else {
      return false;
    }
  } else if (startingBracket == "(") {
    //if the next pair of brackets are the "()" brackets
    //check if there are bigger brackets witin the "()" brackets and return false if there are

    for (let i = 0; i < tempStr.length; i++) {
      if (
        tempStr[i] == "[" ||
        tempStr[i] == "]" ||
        tempStr[i] == "{" ||
        tempStr == "}"
      )
        return false;
    }
    //if there are no bigger brackets inside the small "()" brackets return true
    return true;
  } else {
    //if there are no other brackets left in the string
    return true;
  }
}

function mediumOuterBracketCase(str) {
  //in case of outer brackets being the medium "[]" brackets

  let tempStr = str.replace("[", "");
  tempStr = tempStr.replace("]", "");

  let startingBracket = findStartingBracket(tempStr);
  let endingBracket = findEndingBracket(tempStr);

  if (tempStr.includes("{") || tempStr.includes("}")) {
    //if the "large" brackets are found within the medium brackets, string is invalid
    return false;
  }

  if (!compareOuterBracketTypes(startingBracket, endingBracket)) {
    return false;
  } else {
    return true;
  }
}
console.log(validateBrackets("[(asd])")); // false
console.log(validateBrackets("{[(asd)]}")); // true;
console.log(validateBrackets("[{asd}]")); //false
console.log(validateBrackets("[(asd])")); //false
console.log(validateBrackets("{aaa[bbb(ccc)ddd]eee}")); //true
