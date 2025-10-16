
import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 1,
    level: 1,
    title: 'Print Your First Python Line',
    description: 'The classic "Hello, World!" is the first step in any programmer\'s journey. Use the `print()` function to display the text "Hello, CodeQuest!".',
    starterCode: 'print("Hello, CodeQuest!")',
    expectedOutput: 'Hello, CodeQuest!',
    xpAward: 10,
    coinAward: 5,
  },
  {
    id: 2,
    level: 2,
    title: 'Simple Arithmetic',
    description: 'Python can be used as a powerful calculator. Write a program that calculates and prints the sum of 15 and 27.',
    starterCode: '# Your code here to calculate 15 + 27',
    expectedOutput: '42',
    xpAward: 15,
    coinAward: 10,
  },
  {
    id: 3,
    level: 3,
    title: 'Working with Variables',
    description: 'Store the message "Python is fun" in a variable called `my_message` and then print the contents of the variable.',
    starterCode: 'my_message = "Python is fun"\n# Now print the variable',
    expectedOutput: 'Python is fun',
    xpAward: 20,
    coinAward: 15,
  },
   {
    id: 4,
    level: 4,
    title: 'Looping with `for`',
    description: 'Use a `for` loop and the `range()` function to print the numbers from 0 to 4, each on a new line.',
    starterCode: '# Use a for loop to print numbers 0 through 4',
    expectedOutput: '0\n1\n2\n3\n4',
    xpAward: 25,
    coinAward: 20,
  },
];
