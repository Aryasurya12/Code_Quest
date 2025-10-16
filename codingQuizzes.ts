import { CodingQuiz } from '../types';

export const codingQuizzes: CodingQuiz[] = [
  // Easy
  {
    id: 1,
    title: 'Function: Double the Number',
    description: 'Write a Python function called `double` that takes one number as an argument and returns that number multiplied by 2.',
    difficulty: 'Easy',
    starterCode: `def double(n):
  # Your code here
  return 0
`,
    testHarness: (input) => `print(double(${input}))`,
    testCases: [
      { input: '5', expectedOutput: '10' },
      { input: '0', expectedOutput: '0' },
      { input: '-3', expectedOutput: '-6' },
    ],
    hint: 'Remember to use the `*` operator for multiplication.',
    xpAward: 25,
    coinAward: 10,
  },
  {
    id: 2,
    title: 'String: Reverse It',
    description: 'Write a Python function called `reverse_string` that takes a string and returns it in reverse order.',
    difficulty: 'Easy',
    starterCode: `def reverse_string(s):
  # Your code here
  return ""
`,
    testHarness: (input) => `print(reverse_string("${input}"))`,
    testCases: [
      { input: 'hello', expectedOutput: 'olleh' },
      { input: 'Python', expectedOutput: 'nohtyP' },
      { input: 'a', expectedOutput: 'a' },
    ],
    hint: 'You can use slicing to reverse a string in Python! Look up string slicing `[::-1]`.',
    xpAward: 30,
    coinAward: 15,
  },
  {
    id: 3,
    title: 'List: Sum of Numbers',
    description: 'Write a Python function `sum_list` that takes a list of numbers and returns their sum.',
    difficulty: 'Easy',
    starterCode: `def sum_list(numbers):
  # Your code here
  return 0
`,
    testHarness: (input) => `print(sum_list(${input}))`,
    testCases: [
      { input: '[1, 2, 3]', expectedOutput: '6' },
      { input: '[]', expectedOutput: '0' },
      { input: '[-1, 0, 1]', expectedOutput: '0' },
      { input: '[10, 20, 30, 40]', expectedOutput: '100' },
    ],
    hint: 'Python has a built-in `sum()` function that works on lists.',
    xpAward: 35,
    coinAward: 20,
  },
  {
    id: 4,
    title: 'Boolean: Is Even?',
    description: 'Write a Python function `is_even` that checks if a number is even. It should return `True` if the number is even, and `False` otherwise.',
    difficulty: 'Easy',
    starterCode: `def is_even(n):
  # Your code here
  return False
`,
    testHarness: (input) => `print(is_even(${input}))`,
    testCases: [
      { input: '2', expectedOutput: 'True' },
      { input: '7', expectedOutput: 'False' },
      { input: '0', expectedOutput: 'True' },
      { input: '-4', expectedOutput: 'True' }
    ],
    hint: 'The modulo operator `%` can be very helpful here. An even number has a remainder of 0 when divided by 2.',
    xpAward: 25,
    coinAward: 15,
  },
  {
    id: 5,
    title: 'List: Find Maximum',
    description: 'Write a Python function `find_max` that takes a list of numbers and returns the largest number in the list. The list will not be empty.',
    difficulty: 'Easy',
    starterCode: `def find_max(numbers):
  # Your code here
  return 0
`,
    testHarness: (input) => `print(find_max(${input}))`,
    testCases: [
      { input: '[1, 5, 2, 9, 3]', expectedOutput: '9' },
      { input: '[-1, -5, -2]', expectedOutput: '-1' },
      { input: '[100]', expectedOutput: '100' }
    ],
    hint: 'Python has a built-in `max()` function that can solve this easily.',
    xpAward: 25,
    coinAward: 15,
  },
  // Medium
  {
    id: 6,
    title: 'String: Palindrome Check',
    description: 'A palindrome is a word that reads the same forwards and backwards. Write a function `is_palindrome` that checks if a given string is a palindrome. It should be case-insensitive.',
    difficulty: 'Medium',
    starterCode: `def is_palindrome(s):
  # Your code here
  return False
`,
    testHarness: (input) => `print(is_palindrome("${input}"))`,
    testCases: [
      { input: 'racecar', expectedOutput: 'True' },
      { input: 'hello', expectedOutput: 'False' },
      { input: 'Madam', expectedOutput: 'True' },
      { input: 'a', expectedOutput: 'True' }
    ],
    hint: "First, convert the string to lowercase. Then, compare the string with its reversed version. You can use slicing `[::-1]` to reverse it.",
    xpAward: 40,
    coinAward: 25,
  },
  {
    id: 7,
    title: 'Algorithm: FizzBuzz',
    description: "Write a function `fizz_buzz` that takes a number `n`. It should return a list of strings from 1 to `n`. For multiples of three, use 'Fizz' instead of the number. For multiples of five, use 'Buzz'. For numbers which are multiples of both three and five, use 'FizzBuzz'.",
    difficulty: 'Medium',
    starterCode: `def fizz_buzz(n):
  # Your code here
  return []
`,
    testHarness: (input) => `print(fizz_buzz(${input}))`,
    testCases: [
      { input: '3', expectedOutput: "['1', '2', 'Fizz']" },
      { input: '5', expectedOutput: "['1', '2', 'Fizz', '4', 'Buzz']" },
      { input: '15', expectedOutput: "['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']" }
    ],
    hint: "Use a loop from 1 to n. Inside the loop, check for divisibility by 15 first (for FizzBuzz), then by 3, then by 5. The modulo operator `%` is key.",
    xpAward: 40,
    coinAward: 25,
  },
  {
    id: 8,
    title: 'String: Count Vowels',
    description: "Write a function `count_vowels` that takes a string and returns the number of vowels (a, e, i, o, u) it contains. The function should be case-insensitive.",
    difficulty: 'Medium',
    starterCode: `def count_vowels(s):
  # Your code here
  return 0
`,
    testHarness: (input) => `print(count_vowels("${input}"))`,
    testCases: [
      { input: 'hello world', expectedOutput: '3' },
      { input: 'PYTHON', expectedOutput: '1' },
      { input: 'AEIOU', expectedOutput: '5' },
      { input: 'rhythm', expectedOutput: '0' }
    ],
    hint: "Iterate through each character of the string (after converting it to lowercase) and check if the character is in the string 'aeiou'.",
    xpAward: 40,
    coinAward: 25,
  },
  {
    id: 9,
    title: 'Math: Factorial',
    description: "Write a function `factorial` that returns the factorial of a non-negative integer. The factorial of n (n!) is the product of all positive integers up to n. `factorial(0)` is 1.",
    difficulty: 'Medium',
    starterCode: `def factorial(n):
  # Your code here
  return 1
`,
    testHarness: (input) => `print(factorial(${input}))`,
    testCases: [
      { input: '5', expectedOutput: '120' },
      { input: '0', expectedOutput: '1' },
      { input: '1', expectedOutput: '1' },
      { input: '7', expectedOutput: '5040' }
    ],
    hint: "You can solve this with a loop. Initialize a result to 1 and multiply it by numbers from 1 up to n. A recursive solution is also possible.",
    xpAward: 45,
    coinAward: 30,
  },
  {
    id: 10,
    title: 'Math: Fibonacci Sequence',
    description: 'The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones, usually starting with 0 and 1. Write a function `fibonacci` that takes an integer `n` and returns the nth Fibonacci number.',
    difficulty: 'Medium',
    starterCode: `def fibonacci(n):
  # Your code here
  return 0
`,
    testHarness: (input) => `print(fibonacci(${input}))`,
    testCases: [
      { input: '0', expectedOutput: '0' },
      { input: '1', expectedOutput: '1' },
      { input: '2', expectedOutput: '1' },
      { input: '7', expectedOutput: '13' },
      { input: '10', expectedOutput: '55' }
    ],
    hint: "You can solve this iteratively. Initialize two variables `a=0` and `b=1`. Then, loop `n` times, updating `a` and `b` in each step.",
    xpAward: 50,
    coinAward: 35,
  },
  // Difficult
  {
    id: 11,
    title: 'Lists: Intersection of Two Lists',
    description: "Write a function `list_intersection` that takes two lists and returns a new list containing only the elements that are present in both lists. The returned list should not contain duplicates and should be sorted.",
    difficulty: 'Difficult',
    starterCode: `def list_intersection(list1, list2):
  # Your code here
  return []
`,
    testHarness: (input) => `print(list_intersection(${input}))`,
    testCases: [
      { input: '[1, 2, 3, 4], [3, 4, 5, 6]', expectedOutput: '[3, 4]' },
      { input: '[10, 20], [30, 40]', expectedOutput: '[]' },
      { input: '[1, 1, 2, 2], [2, 2, 3, 3]', expectedOutput: '[2]' }
    ],
    hint: "Sets are very efficient for this. Convert both lists to sets and find their intersection using the `&` operator, then convert the result back to a sorted list.",
    xpAward: 60,
    coinAward: 40,
  },
  {
    id: 12,
    title: 'Algorithm: Two Sum',
    description: "Given a list of integers `nums` and an integer `target`, write a function `two_sum` that returns the indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution. Return the indices in sorted order.",
    difficulty: 'Difficult',
    starterCode: `def two_sum(nums, target):
  # Your code here
  return []
`,
    testHarness: (input) => `print(sorted(two_sum(${input})))`,
    testCases: [
      { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' },
      { input: '[3, 3], 6', expectedOutput: '[0, 1]' }
    ],
    hint: "A hash map (dictionary in Python) is perfect for this. Iterate through the list. For each number, check if `target - number` exists in the map. If it does, you've found a pair. If not, add the number and its index to the map.",
    xpAward: 65,
    coinAward: 45,
  },
  {
    id: 13,
    title: 'Algorithm: Valid Parentheses',
    description: "Write a function `is_valid_parentheses` that takes a string containing just '(', ')', '{', '}', '[' and ']' and determines if it's valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.",
    difficulty: 'Difficult',
    starterCode: `def is_valid_parentheses(s):
  # Your code here
  return False
`,
    testHarness: (input) => `print(is_valid_parentheses("${input}"))`,
    testCases: [
      { input: '()', expectedOutput: 'True' },
      { input: '()[]{}', expectedOutput: 'True' },
      { input: '(]', expectedOutput: 'False' },
      { input: '([)]', expectedOutput: 'False' },
      { input: '{[]}', expectedOutput: 'True' }
    ],
    hint: "Use a stack (a list can act as a stack). When you see an opening bracket, push it onto the stack. When you see a closing bracket, check if the stack is empty or if the top of the stack is the matching opening bracket. If it matches, pop the stack.",
    xpAward: 70,
    coinAward: 50,
  },
  {
    id: 14,
    title: 'Algorithm: Bubble Sort',
    description: "Implement the Bubble Sort algorithm. Write a function `bubble_sort` that takes a list of numbers and sorts it in ascending order. You should not use the built-in `.sort()` or `sorted()`.",
    difficulty: 'Difficult',
    starterCode: `def bubble_sort(arr):
  # Your code here
  return arr
`,
    testHarness: (input) => `print(bubble_sort(${input}))`,
    testCases: [
      { input: '[64, 34, 25, 12, 22, 11, 90]', expectedOutput: '[11, 12, 22, 25, 34, 64, 90]' },
      { input: '[5, 1, 4, 2, 8]', expectedOutput: '[1, 2, 4, 5, 8]' },
      { input: '[]', expectedOutput: '[]' }
    ],
    hint: "Bubble sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. You'll need nested loops.",
    xpAward: 65,
    coinAward: 45,
  },
  {
    id: 15,
    title: 'Algorithm: Longest Common Prefix',
    description: 'Write a function `longest_common_prefix` to find the longest common prefix string amongst a list of strings. If there is no common prefix, return an empty string `""`.',
    difficulty: 'Difficult',
    starterCode: `def longest_common_prefix(strs):
  # Your code here
  return ""
`,
    testHarness: (input) => `print(longest_common_prefix(${input}))`,
    testCases: [
      { input: '["flower","flow","flight"]', expectedOutput: 'fl' },
      { input: '["dog","racecar","car"]', expectedOutput: '' },
      { input: '["apple"]', expectedOutput: 'apple' },
      { input: '[]', expectedOutput: '' }
    ],
    hint: "Start by assuming the first string is the prefix. Then, iterate through the rest of the strings, shortening the prefix if it's not found at the beginning of the current string. The `startswith()` string method can be useful.",
    xpAward: 75,
    coinAward: 55,
  },
];