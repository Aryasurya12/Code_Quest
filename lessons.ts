import { Lesson } from '../types';

export const lessons: Lesson[] = [
  // Procedural Programming
  {
    id: 1,
    title: 'Variables and Data Types',
    category: 'Procedural Programming',
    theory: `In Python, a variable is a name that refers to a value. You can think of it as a labeled box where you store data.\n\nPython has several built-in data types:\n- **int**: Integer numbers (e.g., 10, -5)\n- **float**: Floating-point numbers (e.g., 3.14, -0.5)\n- **str**: Strings, which are sequences of characters (e.g., "Hello", 'Python')\n- **bool**: Boolean values, which can be either True or False.\n\nExample:\n\`\`\`python\nname = "CodeQuest"\nlevel = 1\npi = 3.14\nis_fun = True\n\`\`\``,
    xpAward: 20,
    coinAward: 10,
    quiz: [
      {
        question: 'Which data type would you use to store a whole number like 100?',
        options: ['float', 'str', 'int', 'bool'],
        correctAnswerIndex: 2,
      },
      {
        question: 'What is the value of `is_active` after this code runs?\n`is_active = True`',
        options: ['"True"', '1', 'True', 'False'],
        correctAnswerIndex: 2,
      },
      {
        question: 'Which of the following is a valid variable name in Python?',
        options: ['1st_place', 'user-name', 'user_name', 'class'],
        correctAnswerIndex: 2,
      },
      {
        question: 'What will be the data type of the variable `price`?\n`price = 99.95`',
        options: ['str', 'int', 'float', 'bool'],
        correctAnswerIndex: 2,
      },
      {
        question: 'In Python, do you need to declare a variable\'s type before assigning a value?',
        options: ['Yes, always', 'Only for numbers', 'No, Python is dynamically typed', 'Only for strings'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Control Flow (if/else)',
    category: 'Procedural Programming',
    theory: `Control flow statements allow your program to make decisions. The \`if\`, \`elif\` (else if), and \`else\` statements are used to execute code blocks conditionally.\n\nThe structure is:\n\`\`\`python\nscore = 85\n\nif score >= 90:\n  print("Grade: A")\nelif score >= 80:\n  print("Grade: B")\nelse:\n  print("Grade: C or below")\n# Output: Grade: B\n\`\`\``,
    xpAward: 25,
    coinAward: 15,
    quiz: [
      {
        question: 'What keyword is used for the "else if" condition in Python?',
        options: ['elseif', 'else if', 'elif', 'case'],
        correctAnswerIndex: 2,
      },
      {
        question: 'Will the `else` block always execute if the `if` condition is false?',
        options: ['Yes, always', 'No, only if there is no `elif`', 'No, it\'s optional', 'Yes, but it must come before `elif`'],
        correctAnswerIndex: 2,
      },
      {
        question: 'What will be printed by this code?\n`x = 10\nif x > 10:\n  print("A")\nelif x == 10:\n  print("B")\nelse:\n  print("C")`',
        options: ['A', 'B', 'C', 'Nothing'],
        correctAnswerIndex: 1,
      },
       {
        question: 'Which operator is used to check for equality?',
        options: ['=', '==', '!=', ':='],
        correctAnswerIndex: 1,
      },
      {
        question: 'An `if` statement must always be followed by an `else` statement.',
        options: ['True', 'False'],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    id: 3,
    title: 'Loops (for/while)',
    category: 'Procedural Programming',
    theory: `Loops are used to execute a block of code repeatedly.\n\n- **for loop**: Iterates over a sequence (like a list, tuple, or string).\n\`\`\`python\nfor i in range(3):\n  print(i)\n# Output: 0, 1, 2\n\`\`\`\n- **while loop**: Repeats as long as a condition is true.\n\`\`\`python\ncount = 0\nwhile count < 3:\n  print(count)\n  count += 1\n# Output: 0, 1, 2\n\`\`\``,
    xpAward: 30,
    coinAward: 20,
    quiz: [
        {
          question: 'Which loop is best when you want to iterate a specific number of times?',
          options: ['while', 'for', 'if', 'repeat'],
          correctAnswerIndex: 1,
        },
        {
          question: 'What is a potential risk with `while` loops?',
          options: ['They are slow', 'They cannot count backwards', 'They can result in an infinite loop', 'They only work with numbers'],
          correctAnswerIndex: 2,
        },
        {
          question: 'How many times will "Hello" be printed?\n`for _ in range(5): print("Hello")`',
          options: ['4', '5', '6', '0'],
          correctAnswerIndex: 1,
        },
        {
          question: 'What does `count += 1` mean?',
          options: ['count = 1', 'count = count + 1', 'check if count is 1', 'count = count + count'],
          correctAnswerIndex: 1,
        },
        {
          question: 'Which function generates a sequence of numbers?',
          options: ['sequence()', 'generate()', 'range()', 'numbers()'],
          correctAnswerIndex: 2,
        },
    ],
  },
   {
    id: 4,
    title: 'Functions',
    category: 'Procedural Programming',
    theory: `Functions are reusable blocks of code that perform a specific task. They help organize code and make it more readable.\n\nYou define a function using the \`def\` keyword.\n\n\`\`\`python\ndef greet(name):\n  return f"Hello, {name}!"\n\nmessage = greet("Alice")\nprint(message)\n# Output: Hello, Alice!\n\`\`\``,
    xpAward: 35,
    coinAward: 25,
    quiz: [
      {
        question: 'What keyword is used to define a function in Python?',
        options: ['function', 'def', 'fun', 'define'],
        correctAnswerIndex: 1,
      },
      {
        question: 'What does the `return` keyword do in a function?',
        options: ['Prints a value', 'Stops the function', 'Sends a value back from the function', 'Restarts the function'],
        correctAnswerIndex: 2,
      },
      {
        question: 'A value passed into a function is called a(n)...',
        options: ['parameter', 'argument', 'return value', 'variable'],
        correctAnswerIndex: 1,
      },
       {
        question: 'What will be the output of `add(5, 3)`?\n`def add(a, b):\n  print(a + b)`',
        options: ['Nothing', 'An error', '8', 'The function definition'],
        correctAnswerIndex: 2,
      },
       {
        question: 'Can a function be defined without any parameters?',
        options: ['Yes', 'No'],
        correctAnswerIndex: 0,
      },
    ],
  },
   {
    id: 5,
    title: 'Lists and Dictionaries',
    category: 'Procedural Programming',
    theory: `Python provides powerful data structures to store collections of data.\n\n- **Lists**: Ordered, mutable (changeable) collections of items. Defined with square brackets \`[]\`.\n\`\`\`python\nnumbers = [1, 2, 3, 4]\nnumbers.append(5)\nprint(numbers[0]) # Access by index\n# Output: 1\n\`\`\`\n- **Dictionaries**: Unordered collections of key-value pairs. Defined with curly braces \`{}\`.\n\`\`\`python\nuser = {"name": "Bob", "level": 5}\nprint(user["name"])\n# Output: Bob\n\`\`\``,
    xpAward: 40,
    coinAward: 30,
    quiz: [
      {
        question: 'How do you access the first element of a list named `my_list`?',
        options: ['my_list(0)', 'my_list[0]', 'my_list.first()', 'my_list.get(0)'],
        correctAnswerIndex: 1,
      },
      {
        question: 'Which of these is mutable?',
        options: ['string', 'tuple', 'integer', 'list'],
        correctAnswerIndex: 3,
      },
      {
        question: 'How do you retrieve a value from a dictionary `d` using its key `k`?',
        options: ['d.get(k)', 'd[k]', 'Both A and B are correct', 'd(k)'],
        correctAnswerIndex: 2,
      },
      {
        question: 'Which method adds an element to the end of a list?',
        options: ['add()', 'push()', 'insert()', 'append()'],
        correctAnswerIndex: 3,
      },
       {
        question: 'What are the keys in this dictionary?\n`player = {"username": "cypher", "score": 100}`',
        options: ['"cypher", 100', '"username", "score"', '"player", "username", "score"', 'Dictionaries don\'t have keys'],
        correctAnswerIndex: 1,
      },
    ],
  },
  {
    id: 11,
    title: "Tuples & Sets",
    category: "Procedural Programming",
    theory: "Beyond lists and dictionaries, Python has other useful data structures.\n\n- **Tuples**: Similar to lists, but they are **immutable**, meaning they cannot be changed after creation. They are created with parentheses `()`.\n\`\`\`python\npoint = (10, 20)\nprint(point[0]) # Access elements like a list\n# point[0] = 15 would cause an error!\n\`\`\`\n- **Sets**: Unordered collections of **unique** elements. They are highly optimized for checking if an element is present in the set. They are created with curly braces `{}` or the `set()` function for an empty set.\n\`\`\`python\ncolors = {'red', 'green', 'blue'}\ncolors.add('red') # Does nothing, 'red' is already there\nprint('green' in colors) # Fast membership checking\n# Output: True\n\`\`\`",
    xpAward: 20,
    coinAward: 15,
    quiz: [
        { question: "What is the key difference between a list and a tuple?", options: ["Lists are ordered, tuples are not", "Tuples are mutable, lists are not", "Lists are mutable, tuples are not", "They are identical"], correctAnswerIndex: 2 },
        { question: "How do you create an empty set?", options: ["`{}`", "`[]`", "`set()`", "`()"], correctAnswerIndex: 2 },
        { question: "What happens if you run `my_set = {1, 2, 2, 3}; print(my_set)`?", options: ["It prints `{1, 2, 2, 3}`", "It prints `{1, 2, 3}`", "It causes an error", "It prints `(1, 2, 3)`"], correctAnswerIndex: 1 },
        { question: "Which data structure is best for storing a fixed collection of items that should not be changed, like coordinates?", options: ["list", "dictionary", "set", "tuple"], correctAnswerIndex: 3 },
        { question: "Which operation is significantly faster with sets compared to lists?", options: ["Adding an element", "Checking for an element's existence", "Iterating through elements", "Deleting the collection"], correctAnswerIndex: 1 }
    ]
  },
  {
      id: 12,
      title: "Advanced String Manipulation",
      category: "Procedural Programming",
      theory: "Python's strings have many powerful methods.\n\n- **f-strings**: The modern way to format strings. They are concise and readable.\n\`\`\`python\nname = 'Alice'\nprint(f'Hello, {name}!')\n# Output: Hello, Alice!\n\`\`\`\n- **split()**: Splits a string into a list of substrings.\n\`\`\`python\nwords = 'Hello world how are you'.split(' ')\n# words is ['Hello', 'world', 'how', 'are', 'you']\n\`\`\`\n- **join()**: Joins a list of strings into a single string.\n\`\`\`python\nmessage = ' '.join(words)\n# message is 'Hello world how are you'\n\`\`\`\n- **strip()**: Removes leading/trailing whitespace.\n\`\`\`python\ntext = '   some text   '\nprint(text.strip())\n# Output: 'some text'\n\`\`\`",
      xpAward: 25,
      coinAward: 15,
      quiz: [
          { question: "Which method would you use to turn the list `['a', 'b', 'c']` into the string `'a-b-c'`?", options: ["`split('-')`", "`join('-')`", "`.join('-')` on the list", "`'-'.join(['a', 'b', 'c'])`"], correctAnswerIndex: 3 },
          { question: "What is the output of `f'2 + 2 = {2 + 2}'`?", options: ["`'2 + 2 = {2 + 2}'`", "`'2 + 2 = 4'`", "An error", "`'4'`"], correctAnswerIndex: 1 },
          { question: "What does `'Python'.upper()` return?", options: ["`'python'`", "`'PYTHON'`", "`'pYTHON'`", "An error"], correctAnswerIndex: 1 },
          { question: "The `.split()` method on a string returns a...", options: ["string", "tuple", "list", "dictionary"], correctAnswerIndex: 2 },
          { question: "What is the result of `'  leading and trailing  '.strip()`?", options: ["`'leading and trailing'`", "`'  leading and trailing'`", "`'leading and trailing  '`", "`'  leading and trailing'"], correctAnswerIndex: 0 }
      ]
  },
  {
      id: 13,
      title: "File Handling",
      category: "Procedural Programming",
      theory: "Python can interact with files on your computer.\nThe best way to open a file is using the `with` statement, as it automatically closes the file for you.\n\n\`\`\`python\n# Writing to a file (mode 'w' overwrites the file)\nwith open('greet.txt', 'w') as f:\n    f.write('Hello from CodeQuest!')\n\n# Reading from a file (mode 'r' is the default)\nwith open('greet.txt', 'r') as f:\n    content = f.read()\n    print(content)\n# Output: Hello from CodeQuest!\n\`\`\`\nOther modes include `'a'` for appending to the end of a file and `'r+'` for reading and writing.",
      xpAward: 30,
      coinAward: 20,
      quiz: [
          { question: "Why is the `with open(...) as f:` syntax recommended?", options: ["It's shorter", "It runs faster", "It automatically closes the file", "It can open any file type"], correctAnswerIndex: 2 },
          { question: "Which mode would you use to add text to the end of an existing file without deleting its content?", options: ["`'r'`", "`'w'`", "`'a'`", "`'x'`"], correctAnswerIndex: 2 },
          { question: "The `f.read()` method returns the file's content as a...", options: ["list of lines", "single string", "tuple of words", "dictionary"], correctAnswerIndex: 1 },
          { question: "What happens if you open an existing file in `'w'` mode and write to it?", options: ["The new text is appended", "It raises an error", "The original content is overwritten", "The new text is inserted at the beginning"], correctAnswerIndex: 2 },
          { question: "Which method reads a single line from a file?", options: ["`read()`", "`readline()`", "`readlines()`", "`getline()`"], correctAnswerIndex: 1 }
      ]
  },
  {
      id: 14,
      title: "Error and Exception Handling",
      category: "Procedural Programming",
      theory: "Sometimes, code can fail. Exception handling lets you gracefully manage errors instead of crashing.\nThis is done with a `try...except` block.\n\n\`\`\`python\ntry:\n    number = int(input('Enter a number: '))\n    result = 10 / number\n    print(result)\nexcept ValueError:\n    print('That was not a valid number!')\nexcept ZeroDivisionError:\n    print('You cannot divide by zero!')\n\`\`\`\nThe `try` block contains code that might fail. If an error occurs, Python looks for a matching `except` block to handle it.",
      xpAward: 30,
      coinAward: 20,
      quiz: [
          { question: "What is the purpose of the `try` block?", options: ["To define a function", "To contain code that might raise an exception", "To handle all errors", "To loop until an error occurs"], correctAnswerIndex: 1 },
          { question: "What would `int('abc')` raise?", options: ["`TypeError`", "`SyntaxError`", "`NameError`", "`ValueError`"], correctAnswerIndex: 3 },
          { question: "Which block runs if a `ZeroDivisionError` occurs in the `try` block?", options: ["The `try` block completes", "The `except ZeroDivisionError:` block", "The script crashes", "The `except ValueError:` block"], correctAnswerIndex: 1 },
          { question: "Can you have more than one `except` block for a single `try` block?", options: ["No, only one is allowed", "Yes, to handle different types of exceptions", "Only if they are nested", "Yes, but they all do the same thing"], correctAnswerIndex: 1 },
          { question: "A block of code that runs whether an exception occurs or not is called...", options: ["`else`", "`catch`", "`finally`", "`always`"], correctAnswerIndex: 2 }
      ]
  },
  {
      id: 15,
      title: "List Comprehensions",
      category: "Procedural Programming",
      theory: "List comprehensions provide a concise way to create lists. They are often more readable and performant than using a standard `for` loop.\n\nThe basic syntax is `[expression for item in iterable]`.\n\n\`\`\`python\n# Standard for loop\nsquares = []\nfor i in range(5):\n    squares.append(i * i)\n\n# List comprehension equivalent\nsquares_comp = [i * i for i in range(5)]\n\n# You can also add a condition\neven_numbers = [x for x in range(10) if x % 2 == 0]\n# even_numbers is [0, 2, 4, 6, 8]\n\`\`\`",
      xpAward: 35,
      coinAward: 25,
      quiz: [
          { question: "What is the result of `[x * 2 for x in [1, 2, 3]]`?", options: ["[1, 2, 3]", "[2, 4, 6]", "[1, 4, 9]", "An error"], correctAnswerIndex: 1 },
          { question: "Which of these is a primary advantage of list comprehensions?", options: ["They can do things loops cannot", "They are more explicit and verbose", "They offer a more concise syntax", "They work with dictionaries"], correctAnswerIndex: 2 },
          { question: "How would you create a list of the first letter of each word in `['apple', 'banana', 'cherry']`?", options: ["`[word[0] for word in words]`", "`[word.first() for word in words]`", "`[for word in words: word[0]]`", "`[word(0) for word in words]`"], correctAnswerIndex: 0 },
          { question: "The `if` clause in a list comprehension is...", options: ["Mandatory", "Used for error handling", "Optional, for filtering items", "Placed at the beginning"], correctAnswerIndex: 2 },
          { question: "What does `[c for c in 'hello' if c in 'aeiou']` produce?", options: ["`['h', 'l', 'l']`", "`['e', 'o']`", "`['h', 'e', 'l', 'l', 'o']`", "`True`"], correctAnswerIndex: 1 }
      ]
  },
  // Object-Oriented Programming
  {
    id: 6,
    title: 'Classes and Objects',
    category: 'Object-Oriented Programming',
    theory: `Object-Oriented Programming (OOP) is a paradigm based on the concept of "objects".\n\n- **Class**: A blueprint for creating objects. It defines attributes (data) and methods (functions).\n- **Object**: An instance of a class. It has its own state and behavior.\n\nThe \`__init__\` method is a special method called a constructor, which is run when an object is created.\n\n\`\`\`python\nclass Player:\n  def __init__(self, name, level):\n    self.name = name\n    self.level = level\n\n  def display_info(self):\n    print(f"Player: {self.name}, Level: {self.level}")\n\nplayer1 = Player("Zoe", 10)\nplayer1.display_info()\n\`\`\``,
    xpAward: 50,
    coinAward: 35,
    quiz: [
        {
          question: 'What is a "blueprint" for creating objects called?',
          options: ['Object', 'Function', 'Class', 'Module'],
          correctAnswerIndex: 2,
        },
        {
          question: 'What is an instance of a class called?',
          options: ['Object', 'Function', 'Blueprint', 'Method'],
          correctAnswerIndex: 0,
        },
        {
          question: 'What is the special method `__init__` used for?',
          options: ['To destroy an object', 'To initialize an object\'s attributes', 'To print information', 'To define a class'],
          correctAnswerIndex: 1,
        },
        {
          question: 'What is the purpose of the `self` parameter in a method?',
          options: ['It refers to the class itself', 'It is a global variable', 'It refers to the object instance', 'It is optional and can be omitted'],
          correctAnswerIndex: 2,
        },
        {
          question: 'How do you create an object of a class named `Car`?',
          options: ['my_car = new Car()', 'my_car = Car.create()', 'my_car = Car()', 'create Car() my_car'],
          correctAnswerIndex: 2,
        },
    ],
  },
  {
    id: 7,
    title: 'Inheritance',
    category: 'Object-Oriented Programming',
    theory: `Inheritance allows a new class (subclass or derived class) to inherit attributes and methods from an existing class (superclass or base class).\n\nThis promotes code reuse.\n\n\`\`\`python\nclass Character:\n  def __init__(self, name):\n    self.name = name\n\n  def attack(self):\n    print("Basic attack!")\n\nclass Wizard(Character): # Wizard inherits from Character\n  def cast_spell(self):\n    print("Casting a fireball!")\n\nmerlin = Wizard("Merlin")\nmerlin.attack() # Inherited method\nmerlin.cast_spell() # Own method\n\`\`\``,
    xpAward: 55,
    coinAward: 40,
    quiz: [
      {
        question: 'The class that is being inherited from is called the...',
        options: ['Subclass', 'Child class', 'Superclass', 'Object class'],
        correctAnswerIndex: 2,
      },
      {
        question: 'What is the main benefit of inheritance?',
        options: ['Code security', 'Code reuse', 'Faster execution', 'Simpler syntax'],
        correctAnswerIndex: 1,
      },
      {
        question: 'How do you specify that a class `Dog` inherits from `Animal`?',
        options: ['class Dog(Animal):', 'class Dog inherits Animal:', 'class Dog extends Animal:', 'class Dog :: Animal:'],
        correctAnswerIndex: 0,
      },
       {
        question: 'Can a subclass have its own methods that are not in the superclass?',
        options: ['No, it can only use inherited methods', 'Yes, this is a key feature of inheritance', 'Only if the superclass allows it', 'Only if they are private'],
        correctAnswerIndex: 1,
      },
       {
        question: 'If `Mage` inherits from `Player`, can an object of `Mage` call methods defined in `Player`?',
        options: ['Yes', 'No', 'Only if they are `static`'],
        correctAnswerIndex: 0,
      },
    ],
  },
    {
    id: 8,
    title: 'Encapsulation',
    category: 'Object-Oriented Programming',
    theory: `Encapsulation is the bundling of data (attributes) and methods that operate on the data into a single unit (a class). It restricts direct access to some of an object's components.\n\nIn Python, this is often done by convention using a single underscore prefix (\`_\`) to indicate an attribute is "private" and should not be modified directly from outside the class.\n\n\`\`\`python\nclass BankAccount:\n  def __init__(self, initial_balance):\n    self._balance = initial_balance # By convention, this is private\n\n  def deposit(self, amount):\n    if amount > 0:\n      self._balance += amount\n\n  def get_balance(self):\n    return self._balance\n\`\`\``,
    xpAward: 60,
    coinAward: 45,
    quiz: [
       {
        question: 'What is the primary goal of encapsulation?',
        options: ['To make code run faster', 'To hide complexity and protect data', 'To reuse code', 'To create more objects'],
        correctAnswerIndex: 1,
      },
       {
        question: 'How does Python conventionally indicate an attribute is for internal use?',
        options: ['With the `private` keyword', 'With a double underscore prefix `__`', 'With a single underscore prefix `_`', 'By placing it in a different file'],
        correctAnswerIndex: 2,
      },
       {
        question: 'Bundling data and methods together in a class is an example of...',
        options: ['Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
        correctAnswerIndex: 2,
      },
       {
        question: 'Why might you want to make an attribute "private"?',
        options: ['To prevent other developers from seeing it', 'To ensure it is only changed in a controlled way (e.g., via methods)', 'To save memory', 'Private attributes are faster to access'],
        correctAnswerIndex: 1,
      },
       {
        question: 'Methods that provide access to "private" attributes are often called...',
        options: ['Constructors and Destructors', 'Friend functions', 'Getters and Setters', 'Operators'],
        correctAnswerIndex: 2,
      },
    ],
  },
  {
    id: 9,
    title: 'Polymorphism',
    category: 'Object-Oriented Programming',
    theory: `Polymorphism means "many forms". In OOP, it refers to the ability of different classes to be treated as instances of a common superclass. It allows methods to do different things based on the object it is acting upon.\n\nThis is often achieved through method overriding, where a subclass provides a specific implementation of a method that is already defined in its superclass.\n\n\`\`\`python\nclass Animal:\n  def speak(self):\n    pass # Abstract method\n\nclass Dog(Animal):\n  def speak(self):\n    return "Woof!"\n\nclass Cat(Animal):\n  def speak(self):\n    return "Meow!"\n\nfor animal in [Dog(), Cat()]:\n  print(animal.speak())\n\`\`\``,
    xpAward: 65,
    coinAward: 50,
    quiz: [
      {
        question: 'What does Polymorphism literally mean?',
        options: ['Many functions', 'Many forms', 'Complex code', 'Inherited type'],
        correctAnswerIndex: 1,
      },
      {
        question: 'When a subclass provides its own version of a method from its superclass, it\'s called...',
        options: ['Method overloading', 'Method overriding', 'Method hiding', 'Method constructing'],
        correctAnswerIndex: 1,
      },
      {
        question: 'In the example, `Dog` and `Cat` both have a `speak` method. This is an example of...',
        options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction'],
        correctAnswerIndex: 2,
      },
      {
        question: 'Does Polymorphism require inheritance?',
        options: ['No, they are unrelated', 'Yes, it is a core concept built upon inheritance', 'Only in some cases'],
        correctAnswerIndex: 1,
      },
       {
        question: 'The ability to call the same method (`.speak()`) on different objects (`Dog`, `Cat`) and get different results is a feature of...',
        options: ['Polymorphism', 'A standard `if/else` block', 'Constructors'],
        correctAnswerIndex: 0,
      },
    ],
  },
  {
    id: 10,
    title: 'Dunder Methods',
    category: 'Object-Oriented Programming',
    theory: `Methods that start and end with double underscores, like \`__init__\`, are called "dunder" (double underscore) methods. They allow you to customize the behavior of your objects for built-in Python operations.\n\nFor example, implementing the \`__str__\` method lets you define what happens when you try to print your object.\n\n\`\`\`python\nclass Book:\n  def __init__(self, title, author):\n    self.title = title\n    self.author = author\n\n  def __str__(self):\n    return f"'{self.title}' by {self.author}"\n\nmy_book = Book("The Hobbit", "J.R.R. Tolkien")\nprint(my_book) # Calls the __str__ method\n# Output: 'The Hobbit' by J.R.R. Tolkien\n\`\`\``,
    xpAward: 70,
    coinAward: 55,
    quiz: [
       {
        question: 'What is another name for a "dunder" method?',
        options: ['Private method', 'Special method', 'Hidden method', 'Main method'],
        correctAnswerIndex: 1,
      },
       {
        question: 'Which dunder method is called when an object is created from a class?',
        options: ['__str__', '__new__', '__create__', '__init__'],
        correctAnswerIndex: 3,
      },
       {
        question: 'If you want to customize the output of `print(my_object)`, which method should you define?',
        options: ['__print__', '__repr__', '__str__', '__output__'],
        correctAnswerIndex: 2,
      },
       {
        question: 'Which dunder method is used to get the number of items in a container (e.g., `len(my_object)`)?',
        options: ['__length__', '__size__', '__len__', '__items__'],
        correctAnswerIndex: 2,
      },
       {
        question: 'Dunder methods allow for...',
        options: ['Operator overloading', 'Making classes act like built-in types', 'Customizing class behavior', 'All of the above'],
        correctAnswerIndex: 3,
      },
    ],
  },
  {
      id: 16,
      title: "Static and Class Methods",
      category: "Object-Oriented Programming",
      theory: "Besides regular instance methods (which take `self`), classes can have two other types:\n\n- **Static Methods**: Decorated with `@staticmethod`. They don't receive any special first argument. They are like regular functions but belong to the class's namespace.\n- **Class Methods**: Decorated with `@classmethod`. They receive the class itself as the first argument, conventionally called `cls`.\n\n\`\`\`python\nclass Car:\n  def __init__(self, model):\n    self.model = model\n\n  @staticmethod\n  def is_motor_vehicle():\n    return True\n\n  @classmethod\n  def from_config(cls, config):\n    # A 'factory' to create an instance from a dict\n    return cls(config['model'])\n\ncar = Car.from_config({'model': 'Tesla Model S'})\n\`\`\`",
      xpAward: 60,
      coinAward: 40,
      quiz: [
          { question: "Which decorator is used for a method that does not access instance or class state?", options: ["`@classmethod`", "`@instancemethod`", "`@staticmethod`", "`@method`"], correctAnswerIndex: 2 },
          { question: "What is the conventional name for the first argument of a class method?", options: ["`self`", "`this`", "`class`", "`cls`"], correctAnswerIndex: 3 },
          { question: "Can a static method access `self.model`?", options: ["Yes, directly", "Yes, using `cls.model`", "No, it has no access to `self` or `cls`", "Only if it's public"], correctAnswerIndex: 2 },
          { question: "A common use case for class methods is creating...", options: ["More complex static methods", "Private attributes", "Factory methods", "Decorators"], correctAnswerIndex: 2 },
          { question: "How would you call the `is_motor_vehicle` static method?", options: ["`Car.is_motor_vehicle()`", "`car_instance.is_motor_vehicle(self)`", "`Car.is_motor_vehicle(cls)`", "It cannot be called directly"], correctAnswerIndex: 0 }
      ]
  },
  {
      id: 17,
      title: "Properties",
      category: "Object-Oriented Programming",
      theory: "Properties allow you to expose methods as if they were attributes. This is useful for creating 'getters' and 'setters' to control attribute access.\n\nThe `@property` decorator defines a 'getter' method.\n\n\`\`\`python\nclass Temperature:\n  def __init__(self, celsius):\n    self._celsius = celsius # Private by convention\n\n  @property\n  def fahrenheit(self):\n    return (self._celsius * 9/5) + 32\n\ntemp = Temperature(25)\nprint(temp.fahrenheit) # No parentheses needed!\n# temp.fahrenheit = 100 would cause an error.\n\`\`\`\nYou can also create a 'setter' with `@property_name.setter` to allow controlled modification.",
      xpAward: 65,
      coinAward: 45,
      quiz: [
          { question: "What does the `@property` decorator allow you to do?", options: ["Make a method private", "Access a method like it's an attribute", "Delete an attribute", "Make an attribute static"], correctAnswerIndex: 1 },
          { question: "If you have a property named `value`, how would you define its setter?", options: ["`@setter(value)`", "`@set.value`", "`@value.setter`", "`@setter`"], correctAnswerIndex: 2 },
          { question: "Why are properties useful in encapsulation?", options: ["They hide methods completely", "They allow validation or computation when an attribute is accessed or set", "They are faster than normal attributes", "They prevent inheritance"], correctAnswerIndex: 1 },
          { question: "Given the example, how do you access the Fahrenheit value?", options: ["`temp.fahrenheit()`", "`temp.get_fahrenheit()`", "`temp.fahrenheit`", "`Temperature.fahrenheit()`"], correctAnswerIndex: 2 },
          { question: "A method decorated with only `@property` is effectively...", options: ["Read-only", "Write-only", "A class method", "Deleted"], correctAnswerIndex: 0 }
      ]
  },
  {
      id: 18,
      title: "Operator Overloading",
      category: "Object-Oriented Programming",
      theory: "You can customize the behavior of Python's built-in operators for your custom classes by implementing dunder methods. This is called operator overloading.\n\nFor example, to use the `+` operator on two objects, you define the `__add__` method.\n\n\`\`\`python\nclass Vector:\n  def __init__(self, x, y):\n    self.x = x\n    self.y = y\n\n  def __add__(self, other):\n    return Vector(self.x + other.x, self.y + other.y)\n\n  def __str__(self):\n    return f'Vector({self.x}, {self.y})'\n\nv1 = Vector(2, 3)\nv2 = Vector(4, 5)\nprint(v1 + v2) # Calls v1.__add__(v2)\n# Output: Vector(6, 8)\n\`\`\`",
      xpAward: 70,
      coinAward: 50,
      quiz: [
          { question: "To overload the `*` operator, which method would you implement?", options: ["`__multiply__`", "`__mul__`", "`__mult__`", "`__product__`"], correctAnswerIndex: 1 },
          { question: "What does `obj1 == obj2` implicitly call?", options: ["`obj1.__is_equal__(obj2)`", "`obj1.__eq__(obj2)`", "`obj1.__compare__(obj2)`", "`equals(obj1, obj2)`"], correctAnswerIndex: 1 },
          { question: "The main purpose of operator overloading is to...", options: ["Make code run faster", "Make custom objects behave more intuitively, like built-in types", "Add new operators to Python", "Restrict the use of operators"], correctAnswerIndex: 1 },
          { question: "The `__add__` method should typically return...", options: ["`True` or `False`", "A string representation", "A new object of the class", "`None`"], correctAnswerIndex: 2 },
          { question: "Can you change the behavior of the `len()` function for your object?", options: ["No, it's a built-in function", "Yes, by implementing `__size__`", "Yes, by implementing `__len__`", "No, only for lists and strings"], correctAnswerIndex: 2 }
      ]
  },
  {
      id: 19,
      title: "Decorators",
      category: "Object-Oriented Programming",
      theory: "A decorator is a function that takes another function as input, adds some functionality to it, and returns it. This allows you to modify the behavior of functions or methods without permanently changing their code.\n\nThe `@` syntax is 'syntactic sugar' for this process.\n\n\`\`\`python\ndef my_decorator(func):\n    def wrapper():\n        print('Something is happening before the function is called.')\n        func()\n        print('Something is happening after the function is called.')\n    return wrapper\n\n@my_decorator\ndef say_hello():\n    print('Hello!')\n\nsay_hello()\n\`\`\`",
      xpAward: 75,
      coinAward: 55,
      quiz: [
          { question: "What is a decorator?", options: ["A class that styles another class", "A variable with a special format", "A function that takes another function and extends its behavior", "A special type of comment"], correctAnswerIndex: 2 },
          { question: "What symbol is used to apply a decorator?", options: ["`#`", "`%`", "`&`", "`@`"], correctAnswerIndex: 3 },
          { question: "The function that a decorator returns is often called a...", options: ["clone", "child", "wrapper", "shadow"], correctAnswerIndex: 2 },
          { question: "`@my_decorator` above a function is equivalent to...", options: ["`my_decorator(func)()`", "`func = my_decorator(func)`", "`func.decorate(my_decorator)`", "`my_decorator.apply(func)`"], correctAnswerIndex: 1 },
          { question: "Common use cases for decorators include logging, timing functions, and...", options: ["Creating variables", "Access control / authorization", "Deleting functions", "Writing files"], correctAnswerIndex: 1 }
      ]
  },
  {
      id: 20,
      title: "Abstraction",
      category: "Object-Oriented Programming",
      theory: "Abstraction is the concept of hiding complex implementation details and showing only the essential features of the object. In Python, this is often achieved using Abstract Base Classes (ABCs).\n\nAn ABC defines a common interface for a set of subclasses. You cannot create an instance of an ABC.\n\n\`\`\`python\nfrom abc import ABC, abstractmethod\n\nclass Shape(ABC): # Inherits from ABC\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n\n    def area(self):\n        return self.side * self.side\n\n# my_shape = Shape() would cause an error!\nsquare = Square(5)\nprint(square.area()) # Output: 25\n\`\`\`",
      xpAward: 75,
      coinAward: 55,
      quiz: [
          { question: "What is the main goal of abstraction?", options: ["To make code longer", "To hide complexity and expose only essential functionality", "To make all methods private", "To speed up code execution"], correctAnswerIndex: 1 },
          { question: "Which module is used to create Abstract Base Classes?", options: ["`abstract`", "`abc`", "`baseclass`", "`oop`"], correctAnswerIndex: 1 },
          { question: "What does the `@abstractmethod` decorator signify?", options: ["The method is optional", "The method is private", "The method has no implementation in the base class and must be overridden by subclasses", "The method can be called without an instance"], correctAnswerIndex: 2 },
          { question: "What happens if you try to instantiate a class that inherits from an ABC but doesn't implement all its abstract methods?", options: ["It works fine", "It raises a `TypeError`", "It works, but the methods return `None`", "It raises a `SyntaxError`"], correctAnswerIndex: 1 },
          { question: "A class that implements all the abstract methods of an ABC is called a...", options: ["Child class", "Super class", "Concrete class", "Final class"], correctAnswerIndex: 2 }
      ]
  },
  // GUI Programming
  {
    id: 21,
    title: 'Introduction to GUI with Tkinter',
    category: 'GUI Programming',
    theory: `Tkinter is Python's standard library for creating Graphical User Interfaces (GUIs). A GUI allows users to interact with your program using visual elements like windows, buttons, and text boxes.\n\nThe main window of a Tkinter application is created from the \`Tk\` class. Widgets are the building blocks of a GUI. Common widgets include:\n- **Label**: Displays static text.\n- **Button**: A clickable button that can trigger an action.\n- **Entry**: A text box for user input.\n\n\`\`\`python\nimport tkinter as tk\n\n# Create the main window\nwindow = tk.Tk()\nwindow.title("My First GUI")\n\n# Create a widget (Label)\nlabel = tk.Label(window, text="Hello, Tkinter!")\n\n# Add the widget to the window\nlabel.pack()\n\n# Start the event loop\nwindow.mainloop()\n\`\`\``,
    xpAward: 25,
    coinAward: 15,
    quiz: [
        { question: 'What is Tkinter?', options: ['A database library', 'Python\'s standard GUI library', 'A web framework', 'A game engine'], correctAnswerIndex: 1 },
        { question: 'What is the main window in a Tkinter application usually created from?', options: ['The MainLoop class', 'The Tk class', 'The Canvas class', 'The Widget class'], correctAnswerIndex: 1 },
        { question: 'Which widget is used to display non-editable text?', options: ['Button', 'Entry', 'Label', 'Text'], correctAnswerIndex: 2 },
        { question: 'What does the `window.mainloop()` function do?', options: ['It closes the window', 'It calculates the main loop', 'It starts the event loop, waiting for user actions', 'It deletes all widgets'], correctAnswerIndex: 2 },
        { question: 'What is a "widget" in the context of a GUI?', options: ['A small bug in the code', 'A performance metric', 'A visual element like a button or a text box', 'A type of variable'], correctAnswerIndex: 2 }
    ]
  },
  {
    id: 22,
    title: 'Handling Events with Buttons',
    category: 'GUI Programming',
    theory: `Interactive GUIs respond to user actions, like button clicks. In Tkinter, you can make a button perform an action by linking it to a function using the \`command\` option.\n\nWhen the button is clicked, the specified function is executed.\n\n\`\`\`python\nimport tkinter as tk\n\ndef say_hello():\n  print("Hello, user!")\n\nwindow = tk.Tk()\nwindow.title("Button Demo")\n\n# The 'command' option is set to the function name\nbutton = tk.Button(window, text="Click Me", command=say_hello)\nbutton.pack()\n\nwindow.mainloop()\n# When you click the button, "Hello, user!" will be printed to the console.\n\`\`\``,
    xpAward: 30,
    coinAward: 20,
    quiz: [
        { question: 'Which option for a `Button` widget specifies the function to run when it\'s clicked?', options: ['`onclick`', '`action`', '`function`', '`command`'], correctAnswerIndex: 3 },
        { question: 'When setting the `command` for a button, you should include parentheses `()` after the function name, like `command=my_func()`', options: ['True', 'False'], correctAnswerIndex: 1 },
        { question: 'What is an "event" in a GUI application?', options: ['A planned meeting', 'A syntax error', 'A user action like a mouse click or key press', 'A data type'], correctAnswerIndex: 2 },
        { question: 'In the example, where does the output of `say_hello` appear?', options: ['In a new window', 'In the button\'s text', 'On the console/terminal', 'It doesn\'t appear anywhere'], correctAnswerIndex: 2 },
        { question: 'To create a button, you instantiate the `tk.Button` class.', options: ['True', 'False'], correctAnswerIndex: 0 }
    ]
  },
  {
    id: 23,
    title: 'Layout Management: pack, grid, place',
    category: 'GUI Programming',
    theory: `Placing widgets in a window is handled by layout managers. Tkinter has three main ones:\n\n- **.pack()**: The simplest one. It packs widgets in blocks before placing them in the parent widget. You can specify sides like \`TOP\`, \`BOTTOM\`, \`LEFT\`, or \`RIGHT\`.\n\`\`\`python\nlabel1.pack(side=tk.TOP)\nbutton1.pack(side=tk.BOTTOM)\n\`\`\`\n- **.grid()**: The most versatile. It arranges widgets in a table-like grid of rows and columns.\n\`\`\`python\nentry1.grid(row=0, column=0)\nentry2.grid(row=0, column=1)\n\`\`\`\n- **.place()**: The most precise. It lets you place widgets at specific pixel coordinates (x, y).\n\`\`\`python\nbutton.place(x=50, y=100)\n\`\`\`\n**Important:** You should not mix \`.pack()\` and \`.grid()\` in the same master window.`,
    xpAward: 30,
    coinAward: 20,
    quiz: [
        { question: 'Which layout manager is best for creating table-like structures?', options: ['`.pack()`', '`.grid()`', '`.place()`', '`.align()`'], correctAnswerIndex: 1 },
        { question: 'Which layout manager is the simplest but offers less control?', options: ['`.pack()`', '`.grid()`', '`.place()`', '`.arrange()`'], correctAnswerIndex: 0 },
        { question: 'Is it a good practice to mix `.pack()` and `.grid()` in the same window?', options: ['Yes, it gives more flexibility', 'No, it will cause an error or unexpected behavior', 'It does not matter', 'Only if you use `.place()` as well'], correctAnswerIndex: 1 },
        { question: 'If you want to place a widget at an exact position (e.g., 20 pixels from the top, 40 from the left), which manager would you use?', options: ['`.pack()`', '`.grid()`', '`.place()`', '`.position()`'], correctAnswerIndex: 2 },
        { question: 'In `.grid(row=1, column=2)`, where is the widget placed?', options: ['The first row, second column', 'The second row, third column', 'The first row, third column', 'The second row, second column'], correctAnswerIndex: 1 }
    ]
  }
];