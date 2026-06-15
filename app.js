"use strict";

const STORAGE = {
  complete: "bip-complete-v2",
  bookmarks: "bip-bookmarks-v2",
  stats: "bip-topic-stats-v2",
  bestQuiz: "bip-best-quiz-v2",
  savedCards: "bip-saved-cards-v2"
};

let touchStartX = 0;
let touchEndX = 0;

const iconPaths = {
  exam: '<path d="M8 4h10v16H6V6a2 2 0 0 1 2-2Z"/><path d="M9 9h6"/><path d="M9 13h6"/><path d="M9 17h4"/>',
  cloud: '<path d="M17 18H8a5 5 0 1 1 1.3-9.8A7 7 0 0 1 23 10a4 4 0 0 1-1 8h-1"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/><path d="m3 18 9 5 9-5"/>',
  code: '<path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 4-4 16"/>',
  database: '<ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v14c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3"/>',
  shield: '<path d="M12 3 20 7v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V7l8-4Z"/><path d="m9 12 2 2 4-5"/>',
  tool: '<path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.7 2.7-3-3 2.7-2.7Z"/>',
  chart: '<path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5"/><path d="M12 16V8"/><path d="M16 16v-3"/>',
  cards: '<rect x="4" y="7" width="13" height="14" rx="2"/><path d="M8 3h10a2 2 0 0 1 2 2v12"/><path d="M8 12h5"/><path d="M8 16h3"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/>',
  back: '<path d="M15 18 9 12l6-6"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v6"/><path d="M12 7h.01"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  loop: '<path d="M17 2v5h-5"/><path d="M20 12a8 8 0 1 1-2.34-5.66L17 7"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  list: '<path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/>',
  flow: '<path d="M6 3h12v6H6z"/><path d="M12 9v3"/><path d="M6 15h12v6H6z"/><path d="M8 12h8"/>',
  decision: '<path d="m12 3 9 9-9 9-9-9 9-9z"/><path d="M12 8v4"/><path d="M12 16h.01"/>'
};

function L(title, body, remember, sections = [], code = "") {
  return { title, body, remember, sections, code };
}

function S(title, items) {
  return { title, items };
}

const topics = [
  {
    id: "map",
    title: "Study Map",
    icon: "exam",
    lessons: [
      L("How The Pieces Fit", [
        "Beginner programming is one idea shown in several forms. The word problem is the story. The input, processing, output list is the sorting step. Pseudocode is the written plan. RAPTOR is the picture of the plan. Python is the runnable program.",
        "When a problem feels too large, do not start by typing code. First ask what the program must receive, what it must calculate or decide, and what it must display.",
        "The strongest path is always the same: understand the problem, design exact steps, translate those steps into symbols or code, test with simple values, then fix anything that does not match the expected result."
      ], "Word problem -> IPO -> pseudocode -> RAPTOR -> Python.", [
        S("Use This Order", [
          "Read the problem twice.",
          "Write the final output in one sentence.",
          "List every input the user must provide.",
          "Write each formula or decision in exact words.",
          "Build the flowchart or Python code only after the plan is clear."
        ]),
        S("What Each Form Is For", [
          "IPO helps you sort information before writing steps.",
          "Pseudocode lets you say the logic without strict Python syntax.",
          "RAPTOR helps you see the flow, branches, and repeated paths.",
          "Python turns the plan into instructions the interpreter can run."
        ])
      ]),
      L("The Program Development Cycle", [
        "Programming is a cycle, not a straight line. You analyze, design, code, test, and debug. If the test fails, you return to an earlier step and improve the plan.",
        "A common beginner mistake is skipping design and trying to solve the whole problem in Python syntax. That makes every mistake feel like a syntax problem, even when the real issue is the logic.",
        "Good pseudocode saves time because it exposes missing inputs, vague calculations, and branch problems before you are also dealing with punctuation, indentation, or RAPTOR dialog boxes."
      ], "Design first. Code second. Test often.", [
        S("Cycle Steps", [
          "Analyze: What is given? What is required?",
          "Design: Write IPO, pseudocode, and maybe a flowchart.",
          "Code: Translate the design into Python or RAPTOR.",
          "Test: Use values you can check by hand.",
          "Debug: Fix logic, syntax, spelling, type, or branch errors."
        ])
      ]),
      L("How To Study Without Copying", [
        "Use assignment-like patterns as practice, but do not memorize or copy one exact solution. Change the story, numbers, and variable names so you have to rebuild the logic yourself.",
        "A good practice session asks: What are the inputs? What is the formula? What output should appear? What would happen with small test values?",
        "When you can explain a solution in your own words, you can usually rebuild it in pseudocode, RAPTOR, or Python without needing the original example."
      ], "Learn the pattern, then write your own version.", [
        S("Safe Practice Method", [
          "Change names such as gallons to miles or cups to pounds.",
          "Keep the same structure but use new numbers.",
          "Trace your answer by hand.",
          "Explain why each line is there."
        ])
      ]),
      L("The Small Vocabulary", [
        "You do not need many words to write useful beginner pseudocode. Most early programs use Start, Declare, Write, Input, Set, If, Else, End If, While, End While, and End.",
        "The words are intentionally simple. Write asks or shows. Input receives. Set calculates or stores. Declare prepares a variable. If chooses. While repeats.",
        "Once you see those words as program actions, translating to RAPTOR and Python becomes more mechanical."
      ], "Write shows. Input receives. Set calculates. If chooses. While repeats.", [
        S("Core Words", [
          "Declare: name a variable and type.",
          "Write: show a prompt, message, or result.",
          "Input: get a value from the user.",
          "Set: calculate or assign a value.",
          "If: branch based on a true or false condition.",
          "While: repeat while a condition remains true."
        ])
      ]),
      L("Testing With Tiny Numbers", [
        "Testing is easier when the numbers are small enough to verify in your head. If a formula works for simple values, it is easier to trust it with larger values.",
        "For a tax problem, try a total of 100 and tax rate of 8. The tax should be 8. For an average, try 80 and 100. The average should be 90.",
        "If your program has decisions, test each branch. A range check needs a low invalid value, a high invalid value, and a valid value."
      ], "A test case should prove one small part of the logic.", [
        S("Test Case Checklist", [
          "One normal valid case.",
          "One low edge case.",
          "One high edge case.",
          "One invalid case for every validation rule.",
          "One case for every branch in a table or operator menu."
        ])
      ])
    ]
  },
  {
    id: "basics",
    title: "Computer Basics",
    icon: "cloud",
    lessons: [
      L("What A Program Is", [
        "A program is a set of instructions that tells a computer what to do. The computer does not understand intention. It follows the instructions exactly as written.",
        "Programming means creating those instructions in a language that can be translated for the machine. Python is easier for people to read than machine language, but it still has strict rules.",
        "The early goal is not to memorize every Python feature. The early goal is to think in clear steps."
      ], "A computer is literal, so the steps must be literal.", [
        S("Program Parts", [
          "Input: data that enters the program.",
          "Processing: calculations, comparisons, decisions, and updates.",
          "Output: information displayed or stored after processing."
        ])
      ]),
      L("Hardware, Software, And Memory", [
        "Hardware is the physical equipment. Software is the instructions and data that run on the hardware.",
        "The CPU carries out instructions. RAM holds working data while programs run. Storage keeps files and programs after power is off.",
        "Variables are names that let the program work with values in memory while it runs."
      ], "RAM is temporary working space; storage is long-term file space.", [
        S("Useful Terms", [
          "CPU: executes instructions.",
          "RAM: temporary memory used while programs run.",
          "Storage: long-term place for files.",
          "Software: programs and instructions."
        ])
      ]),
      L("Languages And Translation", [
        "High-level languages such as Python are designed for people to read and write. Low-level languages are closer to the machine.",
        "Assembly language can be useful when programmers need very detailed hardware control, but it is harder for beginners to read.",
        "Compiled languages translate source code before running. Interpreted languages usually read and run statements through an interpreter. Python commonly uses an interpreter."
      ], "Programming languages bridge human logic and machine instructions.", [
        S("Translation Ideas", [
          "Source code is the program text a programmer writes.",
          "A compiler translates code into another form before execution.",
          "An interpreter runs code by reading and executing statements."
        ])
      ]),
      L("Boolean Thinking", [
        "Boolean data has only two possible values: true or false.",
        "Every If condition asks a Boolean question. Is quantity less than zero? Is operator equal to plus? Is password correct?",
        "Boolean thinking matters because decisions, loops, validation, and many bugs depend on the exact true or false result."
      ], "A condition is a question with a true or false answer.", [
        S("Examples", [
          "quantity > 0",
          "operator == \"+\"",
          "score >= 70",
          "num1 < 0 OR num1 > 500"
        ])
      ]),
      L("Data Moving Through A Program", [
        "Most beginner programs move data through a simple path. The user enters values. The program stores those values in variables. The program calculates or decides. The program displays the result.",
        "A variable can be updated. If total starts at 0 and you set total = total + price, the old value helps create the new value.",
        "Trace tables are useful because they show how values change after each instruction."
      ], "Follow the data, and the logic becomes easier to see.", [
        S("Trace Table Columns", [
          "Line number.",
          "Variable values after the line runs.",
          "Output displayed, if any.",
          "Notes about branch choices."
        ])
      ])
    ]
  },
  {
    id: "design",
    title: "Program Design",
    icon: "layers",
    lessons: [
      L("Input Processing Output", [
        "Input, processing, output is the simplest planning tool for beginner programs. It turns a word problem into three buckets.",
        "Inputs are values the program must receive. Processing is the math or logic that changes inputs into results. Outputs are the values or messages the user must see.",
        "If a problem includes decisions, add a fourth note for conditions. Conditions explain when the program should branch."
      ], "IPO is the sorting table before pseudocode.", [
        S("IPO Questions", [
          "Input: What must the user type?",
          "Processing: What formulas or decisions happen?",
          "Output: What must be displayed?",
          "Conditions: What makes the program choose a path?"
        ])
      ]),
      L("Find Output First", [
        "The final output tells you where the program is going. If the program must display current balance, then all inputs and processing must support current balance.",
        "Working backward is powerful. To display liters, you need gallons and a conversion factor. To display gross pay, you need hours and pay rate.",
        "If you cannot name the output, you probably do not understand the problem yet."
      ], "The output is the target; processing is how you reach it.", [
        S("Backward Planning", [
          "Name the final result.",
          "Ask what formula creates it.",
          "Ask which values the formula needs.",
          "Mark which values are user input and which are fixed constants."
        ])
      ]),
      L("Clue Words In Word Problems", [
        "Word problems often hide programming actions inside normal English. Prompt, ask, enter, and type usually mean input. Calculate, compute, determine, convert, and find usually mean processing.",
        "Display, show, print, output, and report usually mean output. If, otherwise, when, valid, invalid, range, at least, and no more than usually mean a selection.",
        "Clue words help, but they do not replace understanding. Always connect the word back to the actual job."
      ], "Action words reveal program actions.", [
        S("Common Clues", [
          "Ask or enter -> Write prompt and Input variable.",
          "Calculate or convert -> Set variable = expression.",
          "Display or show -> Write result.",
          "If or otherwise -> Selection.",
          "Repeat, while, until -> Loop."
        ])
      ]),
      L("Constants And Fixed Values", [
        "A fixed value is a number or text that the problem gives and the user does not type. Examples include a tax rate, conversion factor, recipe amount, or shipping fee.",
        "You can use a fixed value directly in a formula, but a named constant can make the plan easier to understand.",
        "Do not declare literal values as if they were variables. Declare taxRate, not 8. Declare shippingFee, not 35."
      ], "A fixed value is part of processing, not user input.", [
        S("Good Constant Names", [
          "LITERS_PER_GALLON = 3.78541",
          "PENNIES_PER_QUARTER = 25",
          "FREE_SHIPPING_QUANTITY = 50",
          "BASE_RECIPE_COUNT = 20"
        ])
      ]),
      L("Echo Printing", [
        "Echo printing means displaying the input values along with the calculated results. This helps the user verify what they typed.",
        "Many assignment-style programs expect output to include both input and calculated values. If the problem says display all input values and all calculated results, echo printing is required.",
        "Use clear labels so each output value is easy to read."
      ], "Echo print inputs when the output should show what was entered.", [
        S("Output Labels", [
          "Company Name: ",
          "Quantity = ",
          "Retail price = $",
          "Tax = $",
          "Grand total = $"
        ])
      ])
    ]
  },
  {
    id: "pseudocode",
    title: "Pseudocode",
    icon: "file",
    lessons: [
      L("Clean Pseudocode Shape", [
        "Pseudocode is a plain-language plan. It is not Python, and it is not meant to run by itself.",
        "A clean beginner shape is Start, Declare variables, prompt and input values, set formulas, write outputs, and End.",
        "Keep each step short. Numbered steps are easier to trace and easier to translate into RAPTOR symbols."
      ], "Short, numbered, exact steps are easiest to translate.", [
        S("Basic Skeleton", [
          "Start",
          "Declare input variables.",
          "Declare calculated result variables.",
          "Write prompts and Input values.",
          "Set formulas.",
          "Write results.",
          "End"
        ])
      ], [
        "1. Start",
        "2. Declare gallons As Float",
        "3. Declare liters As Float",
        "4. Write \"Enter gallons:\"",
        "5. Input gallons",
        "6. Set liters = gallons * 3.78541",
        "7. Write \"Liters = \" + liters",
        "8. End"
      ].join("\n")),
      L("Declare, Input, Set, Write", [
        "Declare prepares a variable name and type. Input stores a value from the user. Set stores a calculated or assigned value. Write displays text or values.",
        "These four actions handle many early programming problems. When you feel stuck, ask which of the four actions the next line should perform.",
        "In RAPTOR, there is no separate Declare symbol. Variables are created when first given a value through Input or Assignment."
      ], "Declare prepares. Input receives. Set changes. Write displays.", [
        S("Common Mistakes", [
          "Using Write when the program needs to receive input.",
          "Using Input when the program needs to calculate.",
          "Writing a vague Set line without a formula.",
          "Displaying a result before it has been calculated."
        ])
      ]),
      L("Good Versus Weak Steps", [
        "A weak pseudocode line is vague or wordy. A strong pseudocode line tells the exact operation.",
        "For example, calculate the new price is weak. Set newPrice = bookPrice - bookPrice * discountRate / 100 is strong.",
        "Avoid using complete paragraphs inside pseudocode. Use plain commands that another programmer could translate."
      ], "If a line cannot be tested, make it more exact.", [
        S("Better Lines", [
          "Weak: get the first number from the user.",
          "Better: Input num1.",
          "Weak: calculate total.",
          "Better: Set total = price * quantity.",
          "Weak: show answer.",
          "Better: Write \"Total = \" + total."
        ])
      ]),
      L("Modules And Calls", [
        "A module is a named part of a program with one job. Larger pseudocode can be split into modules such as Input Data, Perform Calculations, and Display Results.",
        "Call means run a module, then return to the next line after the call.",
        "Modules make longer programs easier to read, but for small programs a single main module is often enough."
      ], "A module is a small named job.", [
        S("Typical Modules", [
          "Main module: controls the overall order.",
          "Input module: gets user values.",
          "Calculation module: performs formulas.",
          "Output module: displays results."
        ])
      ], [
        "Main module",
        "   Call InputData module",
        "   Call CalculateResults module",
        "   Call DisplayResults module",
        "End Program"
      ].join("\n")),
      L("Tracing Pseudocode", [
        "Tracing means walking through each line and recording variable values as they change.",
        "Only Write lines display output. Set lines change values. Input lines receive values. If lines choose paths.",
        "Tracing catches overwritten variables, wrong order of operations, missing initialization, and branch mistakes."
      ], "Trace values line by line, not by guessing.", [
        S("Trace Example", [
          "Set a = 12.8 -> a is 12.8.",
          "Set a = 15.0 -> a is now 15.0.",
          "Set b = 2 -> b is 2.",
          "Set c = a + a + b -> c is 32.0.",
          "Write c -> the screen shows 32.0."
        ])
      ])
    ]
  },
  {
    id: "variables",
    title: "Variables Types",
    icon: "database",
    lessons: [
      L("Variables As Named Storage", [
        "A variable is a name for a storage location. The program uses the name to remember, calculate with, and display a value.",
        "A variable can change. If dollars starts at 2.75 and later becomes 99.95, the current value is the last value assigned.",
        "Variable names should explain what the value means. totalCost is clearer than t or x."
      ], "A variable name is the label, not the value itself.", [
        S("Name Values You Need To Remember", [
          "User inputs.",
          "Calculated outputs.",
          "Temporary helper values.",
          "Counters and running totals.",
          "Rates, fees, and conversion factors if naming them improves clarity."
        ])
      ]),
      L("Naming Rules", [
        "Variable names should not contain spaces. Use camelCase, PascalCase, or underscores depending on the style expected.",
        "Do not start names with a number. Avoid punctuation such as dollar signs, percent signs, hyphens, and hashtags.",
        "Be consistent with capitalization. In many languages, total, Total, and TOTAL can be different names."
      ], "Descriptive, consistent names prevent strange bugs.", [
        S("Good Names", [
          "numberOfItems",
          "retailPrice",
          "taxRate",
          "taxAmount",
          "grandTotal",
          "operator"
        ]),
        S("Avoid", [
          "Tax Rate with a space.",
          "1Number starting with a digit.",
          "$total with punctuation.",
          "x when a clearer name is available."
        ])
      ]),
      L("Integer Float String Boolean", [
        "Integer is for whole numbers used for counting. Float is for decimal-capable values such as money, rates, measurements, and averages.",
        "String is for text. Character is a single symbol or letter. Boolean is true or false.",
        "Choosing the correct type helps the reader understand what kind of value belongs in the variable."
      ], "Integer counts. Float measures. String stores text. Boolean stores true or false.", [
        S("Type Choices", [
          "Integer: quantity, count, numberOfStudents.",
          "Float: price, taxRate, gallons, average.",
          "String: companyName, userName, password.",
          "Character: operator, response.",
          "Boolean: isValid, hasDiscount."
        ])
      ]),
      L("Python Variables", [
        "Python does not require Declare lines. A Python variable is created when a value is assigned to it.",
        "The equal sign performs assignment. The right side is evaluated first, then the result is stored in the left-side variable.",
        "Python variable names often use lowercase with underscores, such as gross_pay or grand_total."
      ], "Python creates variables through assignment.", [
        S("Python Habits", [
          "Use clear lowercase names with underscores.",
          "Assign before using a variable.",
          "Convert input text before math.",
          "Use comments for logic that is not obvious."
        ])
      ], [
        "quantity = int(input(\"Quantity: \"))",
        "price = float(input(\"Price: \"))",
        "total = quantity * price",
        "print(\"Total =\", total)"
      ].join("\n")),
      L("Initialization", [
        "Initialization means giving a variable a starting value before it is used.",
        "Counters often start at 0 or 1. Running totals usually start at 0. Boolean flags often start as true or false.",
        "Using a variable before it has a value causes errors in Python and RAPTOR."
      ], "Create a value before you use the variable.", [
        S("Common Starting Values", [
          "total = 0",
          "count = 0",
          "isValid = true",
          "result = 0 when a later branch will update it"
        ])
      ])
    ]
  },
  {
    id: "operators",
    title: "Operators",
    icon: "code",
    lessons: [
      L("Assignment And Comparison", [
        "One equals sign assigns a value. It changes the variable on the left.",
        "Double equals compares values. It asks whether the left and right side are equal.",
        "In pseudocode, Set total = price * quantity is assignment. If operator == \"+\" Then is comparison."
      ], "One equals stores. Two equals compares.", [
        S("Use Correctly", [
          "Assignment: Set money = 50.",
          "Comparison: If money == 50 Then.",
          "Invalid assignment: 50 = money.",
          "Python uses = for assignment and == for equality comparison."
        ])
      ]),
      L("Arithmetic Operators", [
        "Use + for addition, - for subtraction, * for multiplication, / for division, % for modulus, and ^ in many pseudocode or RAPTOR examples for exponentiation.",
        "In Python, exponentiation uses ** instead of ^.",
        "Modulus gives the remainder after division. 27 % 8 gives 3."
      ], "Use programming operators, not handwritten math symbols.", [
        S("Examples", [
          "total = price * quantity",
          "remaining = balance - withdrawal",
          "average = total / count",
          "remainder = 27 % 8",
          "squared = value ** 2 in Python"
        ])
      ]),
      L("Order Of Operations", [
        "Programs follow a standard order: parentheses first, exponents, multiplication/division/modulus, then addition/subtraction.",
        "Without parentheses, average = score1 + score2 / 2 divides score2 first, then adds score1. That is not the average of two scores.",
        "Use parentheses whenever the intended order could be misunderstood."
      ], "Parentheses are cheap protection against wrong math.", [
        S("Safe Formulas", [
          "average = (score1 + score2) / 2",
          "taxAmount = total * (taxRate / 100)",
          "discountedPrice = price - (price * discountRate / 100)"
        ])
      ]),
      L("Text Joining And Output", [
        "The plus sign can add numbers, but it can also join text in some pseudocode and RAPTOR output examples.",
        "Python is stricter. You cannot directly add a string and a number without converting the number or using comma-separated print items.",
        "Spaces inside quote marks are displayed exactly. If you want a space around an operator in output, include that space in the string."
      ], "Quote spacing affects the screen; operator spacing helps humans.", [
        S("Output Examples", [
          "\"Total = $\" + total in pseudocode-style output.",
          "print(\"Total = $\", total) in Python.",
          "str(num1) + operator + str(num2) + \" = \" + str(result) when building one string."
        ])
      ]),
      L("Percent And Rates", [
        "A whole-number percent such as 8 must usually be divided by 100 before multiplication.",
        "If the user enters 8 for 8 percent, the decimal rate is 8 / 100, or 0.08.",
        "Tax, discount, interest, and commission problems often use this pattern."
      ], "Whole-number percent must become a decimal rate before multiplication.", [
        S("Pattern", [
          "Input taxRate",
          "Set taxDecimal = taxRate / 100",
          "Set taxAmount = total * taxDecimal"
        ])
      ], [
        "tax_rate = float(input(\"Tax rate as a whole number: \"))",
        "tax_amount = total * (tax_rate / 100)"
      ].join("\n"))
    ]
  },
  {
    id: "python",
    title: "Python Basics",
    icon: "code",
    lessons: [
      L("Printing Output", [
        "The print function displays output on the screen. Text goes inside quote marks.",
        "A variable name should not be placed inside quotes when you want its value. print(\"total\") displays the word total. print(total) displays the value stored in total.",
        "You can print several items by separating them with commas."
      ], "Quoted text prints as text; unquoted variables print their values.", [
        S("Print Examples", [
          "print(\"Hello\")",
          "print(total)",
          "print(\"Total =\", total)",
          "print(\"The answer is\", answer)"
        ])
      ], [
        "room = 503",
        "print(\"I am staying in room number\")",
        "print(room)",
        "print(\"Room:\", room)"
      ].join("\n")),
      L("Getting Keyboard Input", [
        "Python input() pauses the program and lets the user type a value.",
        "The value returned by input() is text. If you need arithmetic, convert it with int() or float().",
        "The prompt can be written inside input(), which combines the prompt and input step."
      ], "input() gives text first; convert before math.", [
        S("Input Choices", [
          "Use int() for whole-number counts.",
          "Use float() for decimals, money, rates, and measurements.",
          "Use plain input() for names, words, and operator symbols."
        ])
      ], [
        "name = input(\"Enter name: \")",
        "quantity = int(input(\"Enter quantity: \"))",
        "price = float(input(\"Enter price: \"))"
      ].join("\n")),
      L("Comments And Readability", [
        "A comment is a note for humans that Python ignores. Comments start with #.",
        "Use comments to explain the purpose of a program, a tricky formula, or a decision rule. Do not comment every obvious line.",
        "Readable code uses good names, spacing, and simple structure."
      ], "Comments explain why, not every tiny what.", [
        S("Good Comment Uses", [
          "Describe the program at the top.",
          "Explain a formula from the problem.",
          "Mark major sections such as input, processing, and output.",
          "Clarify a decision table or validation rule."
        ])
      ], [
        "# Convert gallons to liters.",
        "liters = gallons * 3.78541"
      ].join("\n")),
      L("Python Formatting Basics", [
        "Beginner assignments often do not require formatted decimals, so follow the assignment requirements carefully.",
        "When formatting is allowed, Python f-strings can display values with labels and decimal places.",
        "Do not use a formatting feature if your current course material has not covered it and the assignment says not to use outside techniques."
      ], "Follow the expected style for the current lesson.", [
        S("Useful Later", [
          "f\"Total = ${total:.2f}\" displays two decimal places.",
          "round(value, 2) rounds a number for display.",
          "Comma-separated print is simpler for early practice."
        ])
      ], [
        "total = 12.3456",
        "print(\"Total =\", total)",
        "print(f\"Total = ${total:.2f}\")"
      ].join("\n")),
      L("Syntax Errors Versus Logic Errors", [
        "A syntax error means Python cannot understand the code grammar. Missing colons, unmatched quotes, and wrong indentation can cause syntax errors.",
        "A logic error means the program runs but produces the wrong answer. Wrong formulas, wrong branches, or wrong order of operations cause logic errors.",
        "Pseudocode helps reduce logic errors before Python syntax gets involved."
      ], "Running without crashing is not the same as being correct.", [
        S("Debug Questions", [
          "Did every variable get a value before use?",
          "Did input values get converted before math?",
          "Did the formula match the word problem?",
          "Did every branch get tested?"
        ])
      ])
    ]
  },
  {
    id: "decisions",
    title: "Decisions Logic",
    icon: "decision",
    lessons: [
      L("If Then Else", [
        "A decision structure lets a program choose between paths.",
        "A single-alternative If only does something when the condition is true. A dual-alternative If/Else does one thing when true and another when false.",
        "In RAPTOR, a Selection symbol creates Yes and No branches. In Python, indentation shows which statements belong to each branch."
      ], "A decision starts with a true or false question.", [
        S("Basic Shape", [
          "If condition Then",
          "   true path statements",
          "Else",
          "   false path statements",
          "End If"
        ])
      ], [
        "if quantity <= 0:",
        "    print(\"Invalid quantity\")",
        "else:",
        "    total = quantity * price",
        "    print(total)"
      ].join("\n")),
      L("Relational Operators", [
        "Relational operators compare values. The result is true or false.",
        "Use < for less than, <= for less than or equal to, > for greater than, >= for greater than or equal to, == for equal to, and != for not equal to.",
        "Use == in conditions when you want to check equality."
      ], "Relational operators build Boolean questions.", [
        S("Examples", [
          "score >= 70",
          "quantity <= 0",
          "operator == \"+\"",
          "password != \"secret\""
        ])
      ]),
      L("AND OR NOT", [
        "AND means both parts must be true. OR means at least one part must be true. NOT reverses true and false.",
        "Use AND when a value must be inside a valid range. Use OR when any bad condition should trigger an error.",
        "Parentheses can make mixed logic clearer."
      ], "Use OR to catch any invalid case.", [
        S("Range Thinking", [
          "Valid: number >= 0 AND number <= 500.",
          "Invalid: number < 0 OR number > 500.",
          "Both formulas describe the same range from opposite directions."
        ])
      ], [
        "if number < 0 or number > 500:",
        "    print(\"Number is outside the valid range\")"
      ].join("\n")),
      L("Input Validation", [
        "Validation checks input before the program uses it. This prevents impossible or unsafe calculations.",
        "If a quantity must be positive, check it before calculating totals. If a divisor cannot be zero, check it before division.",
        "Some programs display an error and stop. Later programs may use loops to keep asking until the input is valid."
      ], "Validate before calculating.", [
        S("Validation Examples", [
          "Quantity cannot be 0 or less.",
          "Number must be from 0 through 500.",
          "Operator must be +, -, *, or /.",
          "Denominator cannot be 0."
        ])
      ]),
      L("Decision Tables", [
        "A table of rates, categories, grades, or fees usually becomes a chain of decisions.",
        "Each row becomes one condition. Start at the smallest range and move upward, or start at the largest and move downward. Do not mix the order randomly.",
        "Once a row matches, the later rows should not overwrite the selected value."
      ], "A table is a decision chain.", [
        S("Discount Range Pattern", [
          "If quantity <= 9, rate is 0.",
          "Else if quantity <= 19, rate is 0.10.",
          "Else if quantity <= 39, rate is 0.15.",
          "Else use the next ranges until the final else."
        ])
      ])
    ]
  },
  {
    id: "loops",
    title: "Loops Validation",
    icon: "loop",
    lessons: [
      L("Why Loops Exist", [
        "A loop repeats a block of steps. Use loops when the same action must happen more than once.",
        "A while loop repeats while a condition is true. A for loop is often used when you know the number of repetitions.",
        "Every loop must have a way to stop. If the condition never changes, the loop can repeat forever."
      ], "A loop needs a condition and a path to stop.", [
        S("Loop Uses", [
          "Ask for multiple scores.",
          "Repeat until input is valid.",
          "Process every item in a list.",
          "Keep a running total."
        ])
      ]),
      L("While Loops", [
        "A while loop checks a condition before each repetition.",
        "The loop body should change something that can eventually make the condition false.",
        "Validation loops often start by reading a value, then repeat while the value is invalid."
      ], "While means keep going as long as the condition is true.", [
        S("Validation Shape", [
          "Input number.",
          "While number is invalid.",
          "Display error.",
          "Input number again.",
          "End While."
        ])
      ], [
        "number = int(input(\"Enter 1 through 10: \"))",
        "while number < 1 or number > 10:",
        "    print(\"Invalid\")",
        "    number = int(input(\"Enter 1 through 10: \"))"
      ].join("\n")),
      L("Counters And Running Totals", [
        "A counter tracks how many times something has happened. A running total adds values over time.",
        "Initialize counters and totals before the loop. Update them inside the loop.",
        "For five scores, a counter can control repetition while a total accumulates scores."
      ], "Initialize before the loop; update inside the loop.", [
        S("Common Updates", [
          "count = count + 1",
          "total = total + score",
          "itemsProcessed = itemsProcessed + 1",
          "balance = balance + deposit"
        ])
      ]),
      L("For Loops In Python", [
        "Python for loops are often used when you know how many times to repeat.",
        "range(5) produces five repetitions using values 0 through 4. range(1, 6) produces 1 through 5.",
        "For loops are useful for repeated input when the count is known."
      ], "Use for when the repetition count is known.", [
        S("Example Uses", [
          "Read 5 scores.",
          "Print numbers 1 through 10.",
          "Process each item in a list.",
          "Repeat a practice calculation a fixed number of times."
        ])
      ], [
        "total = 0",
        "for count in range(5):",
        "    score = float(input(\"Score: \"))",
        "    total = total + score",
        "average = total / 5"
      ].join("\n")),
      L("Sentinel Values", [
        "A sentinel is a special value that means stop. For example, the user might enter -1 when there are no more scores.",
        "Sentinel loops are useful when you do not know ahead of time how many values will be entered.",
        "The sentinel should not be processed as normal data."
      ], "A sentinel is a stop signal, not real data.", [
        S("Sentinel Pattern", [
          "Input first value.",
          "While value is not the sentinel.",
          "Process the value.",
          "Input the next value.",
          "End While."
        ])
      ])
    ]
  },
  {
    id: "functions",
    title: "Functions Modules",
    icon: "flow",
    lessons: [
      L("Functions As Named Jobs", [
        "A function is a named group of statements. Calling the function runs those statements.",
        "Functions help split a larger program into smaller jobs. This is similar to modules in pseudocode or Call symbols in RAPTOR.",
        "A good function name describes the job, such as get_input, calculate_total, or display_results."
      ], "A function should do one clear job.", [
        S("Why Use Functions", [
          "Reduce repeated code.",
          "Make long programs easier to read.",
          "Test small pieces separately.",
          "Match top-down design."
        ])
      ], [
        "def show_heading():",
        "    print(\"Practice Program\")",
        "",
        "show_heading()"
      ].join("\n")),
      L("Arguments", [
        "An argument is a value sent into a function. A parameter is the variable name that receives it inside the function.",
        "Arguments let a function work with different values without relying on hidden global variables.",
        "For example, calculate_total(price, quantity) can work for any price and quantity."
      ], "Arguments carry values into a function.", [
        S("Argument Example", [
          "price and quantity are sent into the function.",
          "The function uses them in a formula.",
          "The caller gets the calculated answer."
        ])
      ], [
        "def calculate_total(price, quantity):",
        "    total = price * quantity",
        "    return total"
      ].join("\n")),
      L("Return Values", [
        "A return value is the answer a function sends back to the caller.",
        "Use return when the rest of the program needs the calculated value.",
        "Printing inside a function displays information, but returning gives the program a value it can keep using."
      ], "Return sends an answer back.", [
        S("Print Versus Return", [
          "print displays something now.",
          "return hands a value back to the caller.",
          "A function can return a total, discount, tax, or validation result."
        ])
      ]),
      L("Top-Down Design", [
        "Top-down design starts with the big program goal, then breaks it into smaller named tasks.",
        "A shipping calculator might have get_input, choose_discount_rate, calculate_totals, and display_results.",
        "This makes the program easier to read because the main section shows the order of jobs."
      ], "Main should read like a table of contents.", [
        S("Top-Down Steps", [
          "Write the main program as a few calls.",
          "Define each called module or function.",
          "Give each function one clear purpose.",
          "Test each piece with simple values."
        ])
      ]),
      L("Local And Global Values", [
        "A local variable is created inside a function and normally exists only inside that function.",
        "A global variable is created outside functions and can be seen more broadly, but relying on globals can make programs harder to debug.",
        "Passing arguments and returning values usually creates clearer beginner programs."
      ], "Prefer passing values over depending on hidden globals.", [
        S("Cleaner Function Flow", [
          "Input values in one place.",
          "Pass values into calculation functions.",
          "Return calculated results.",
          "Display results in one place."
        ])
      ])
    ]
  },
  {
    id: "raptor",
    title: "RAPTOR",
    icon: "flow",
    lessons: [
      L("RAPTOR Symbol Map", [
        "RAPTOR is a flowchart tool. It lets you focus on logic without writing full Python syntax.",
        "Each flowchart symbol matches a type of pseudocode action. Start and End mark boundaries. Input receives values. Output displays values. Assignment calculates or stores. Selection branches. Loop repeats. Call runs a subchart.",
        "The fastest build method is to translate one pseudocode line at a time."
      ], "Pseudocode line type tells you the RAPTOR symbol.", [
        S("Symbol Match", [
          "Start or End -> Oval.",
          "Input variable -> Input parallelogram.",
          "Write result -> Output parallelogram.",
          "Set variable = expression -> Assignment rectangle.",
          "If condition -> Selection diamond.",
          "While or repeat -> Loop symbol.",
          "Call module -> Call symbol."
        ])
      ]),
      L("Input And Output Symbols", [
        "An Input symbol receives a value and stores it in a variable. It can also display a prompt depending on how the dialog is filled out.",
        "An Output symbol displays text, variables, results, headings, or error messages.",
        "Comments are not output. A comment is a note for the programmer or grader. Output is something the user sees."
      ], "Input stores; Output displays; comments explain.", [
        S("Output Tips", [
          "Put literal text in quotes.",
          "Use variable names when you want values.",
          "Include spaces inside quoted text when the screen needs spaces.",
          "Use comments to explain the logic, not to display results."
        ])
      ]),
      L("Assignment Symbols", [
        "An Assignment symbol stores a value in a variable or calculates a new value.",
        "The receiving variable is on the left. The expression is on the right. The expression is evaluated first.",
        "Use one assignment symbol per important calculation when you want the flowchart to be easy to read."
      ], "Assignment changes a variable.", [
        S("Examples", [
          "total = quantity * price",
          "tax = total * (taxRate / 100)",
          "average = total / count",
          "counter = counter + 1"
        ])
      ]),
      L("Selection Diamonds", [
        "A Selection diamond asks a yes or no question. The Yes branch runs when the condition is true. The No branch runs when it is false.",
        "Branch mistakes happen when the condition says one thing but the steps are placed as if it says the opposite.",
        "Read the diamond out loud before adding symbols to the branches."
      ], "Match branch actions to the exact question in the diamond.", [
        S("Branch Sanity Check", [
          "Condition: quantity <= 0.",
          "Yes branch: display invalid quantity error.",
          "No branch: continue calculations.",
          "Condition: quantity > 0 would reverse those branches."
        ])
      ]),
      L("Common RAPTOR Errors", [
        "Variable not found usually means a variable was used before it was created or the name is misspelled.",
        "Type errors happen when a variable starts as a number and later receives text, or starts as text and later receives a number.",
        "Bad output often comes from missing quote marks around text or missing spaces inside quoted labels."
      ], "Most RAPTOR errors are spelling, order, type, or branch errors.", [
        S("Fix Checklist", [
          "Check spelling and capitalization of every variable.",
          "Make sure each variable has an Input or Assignment before use.",
          "Keep numeric variables numeric and text variables text.",
          "Verify Yes and No branches match the condition.",
          "Separate comments from Output symbols."
        ])
      ])
    ]
  },
  {
    id: "patterns",
    title: "Word Patterns",
    icon: "tool",
    lessons: [
      L("Conversion Pattern", [
        "A conversion problem asks for a value in one unit and displays the value in another unit.",
        "The important pieces are the input unit, conversion factor, formula, and output unit.",
        "For gallons to liters, the formula is liters = gallons * 3.78541."
      ], "Input unit times conversion factor equals output unit.", [
        S("Conversion Steps", [
          "Declare input value and converted value.",
          "Prompt and input the original unit.",
          "Set converted value using the factor.",
          "Display the converted value with a label."
        ])
      ], [
        "gallons = float(input(\"Gallons: \"))",
        "liters = gallons * 3.78541",
        "print(\"Liters =\", liters)"
      ].join("\n")),
      L("Recipe Scaling Pattern", [
        "Recipe scaling uses a base recipe and a desired amount.",
        "First calculate the scale factor: desired amount divided by original amount. Then multiply each original ingredient by the scale factor.",
        "This pattern works for donuts, paint mixture, serving sizes, batches, or any proportional recipe."
      ], "Scale factor = desired amount / original amount.", [
        S("Recipe Steps", [
          "Input desired amount.",
          "Set scaleFactor = desiredAmount / originalAmount.",
          "Set each needed ingredient = scaleFactor * original ingredient.",
          "Display each needed ingredient."
        ])
      ]),
      L("Coin Total Pattern", [
        "A coin total problem uses counts and fixed coin values.",
        "Each coin count is multiplied by its value, then the results are added.",
        "Use Integer for coin counts and total pennies because they are whole-number counts."
      ], "Count times value, then add.", [
        S("Formula", [
          "totalPennies = quarters * 25 + dimes * 10 + nickels * 5",
          "Use clear names for each count.",
          "Do not put coin values in quote marks because they are numbers."
        ])
      ]),
      L("Bank Balance Pattern", [
        "A balance problem usually begins with a starting balance and changes it using deposits and withdrawals.",
        "Deposits increase the balance. Withdrawals decrease it.",
        "The current balance is starting balance plus deposits minus withdrawals."
      ], "Current balance = starting + deposits - withdrawals.", [
        S("Bank Steps", [
          "Input startingBalance.",
          "Input depositAmount.",
          "Input withdrawalAmount.",
          "Set currentBalance = startingBalance + depositAmount - withdrawalAmount.",
          "Display currentBalance."
        ])
      ]),
      L("Shipping Discount Pattern", [
        "A shipping and discount problem combines several ideas: input, validation, rate table, tax, shipping rule, and final total.",
        "Calculate tax according to the order described in the problem. If tax is before discount, use the original total before subtracting discount.",
        "For shipping rules, write a clear decision: if quantity is at least the free-shipping threshold, shipping is 0; otherwise shipping is the flat fee."
      ], "Do validation first, then rates, then final total.", [
        S("Processing Order", [
          "Validate quantity.",
          "Calculate total = quantity * retailPrice.",
          "Choose discountRate from the table.",
          "Calculate discount.",
          "Calculate tax based on the required order.",
          "Choose shipping fee.",
          "Calculate grandTotal."
        ])
      ])
    ]
  },
  {
    id: "calculator",
    title: "Calculator Logic",
    icon: "chart",
    lessons: [
      L("Calculator Inputs", [
        "A simple calculator usually needs two numbers and one operator.",
        "If the numbers must be within a range, validate both numbers before asking for the operator or calculating a result.",
        "The operator is text, so compare it with quoted symbols such as \"+\" or \"/\"."
      ], "Validate numbers before choosing the operation.", [
        S("Inputs", [
          "num1: numeric.",
          "num2: numeric.",
          "operator: text or character.",
          "result: numeric calculated output."
        ])
      ]),
      L("Operator Branches", [
        "Each allowed operator becomes a branch. Plus adds, minus subtracts, star multiplies, and slash divides.",
        "Use an error branch when the operator is not one of the allowed choices.",
        "Nested selections or else-if chains both work as long as only the matching operation runs."
      ], "Each operator is one decision path.", [
        S("Branch Map", [
          "operator == \"+\" -> result = num1 + num2.",
          "operator == \"-\" -> result = num1 - num2.",
          "operator == \"*\" -> result = num1 * num2.",
          "operator == \"/\" -> check denominator, then divide.",
          "Else -> invalid operator."
        ])
      ]),
      L("Division By Zero", [
        "Division by zero is not allowed. If the operator is division, check the second number before dividing.",
        "The second number is the denominator. If it is 0, display an error and do not calculate division.",
        "This is a special validation rule inside the division branch."
      ], "Check num2 before dividing by num2.", [
        S("Safe Division", [
          "If operator == \"/\" Then",
          "   If num2 == 0 Then display error.",
          "   Else result = num1 / num2.",
          "End If."
        ])
      ]),
      L("Expression Output", [
        "Calculator output often displays the expression and result together.",
        "If the sample output has no spaces around the operator, match it. If it has spaces, include those spaces inside the output text.",
        "In Python, convert numbers to strings if you build one combined output string."
      ], "Output spacing must match the desired screen display.", [
        S("Examples", [
          "15+4 = 19",
          "15 + 4 = 19",
          "Both can be correct if they match the expected style."
        ])
      ]),
      L("Calculator Test Cases", [
        "A calculator has many branches, so it needs multiple test cases.",
        "Test a low invalid number, a high invalid number, an invalid operator, each valid operator, and division by zero.",
        "A program that only works for addition is not finished."
      ], "Every branch needs a test.", [
        S("Minimum Tests", [
          "num1 too low.",
          "num2 too high.",
          "invalid operator.",
          "addition.",
          "subtraction.",
          "multiplication.",
          "division.",
          "division by zero."
        ])
      ])
    ]
  },
  {
    id: "collections",
    title: "Lists Strings",
    icon: "list",
    lessons: [
      L("Lists Hold Many Values", [
        "A list stores multiple values under one name.",
        "Lists are useful for scores, names, prices, or repeated values when you do not want a separate variable for each item.",
        "Python list indexes start at 0, so the first item is scores[0]."
      ], "A list is one name with many positions.", [
        S("List Actions", [
          "Create a list.",
          "Append new values.",
          "Loop through values.",
          "Use len() for count.",
          "Use sum() for numeric totals."
        ])
      ], [
        "scores = [82, 91, 77]",
        "average = sum(scores) / len(scores)",
        "print(average)"
      ].join("\n")),
      L("Tuples", [
        "A tuple is a sequence like a list, but it is normally not changed after creation.",
        "Tuples are useful when values belong together and should stay fixed.",
        "For beginner programs, lists are more common when values need to be added or changed."
      ], "Tuple values are grouped and usually unchanged.", [
        S("Examples", [
          "point = (4, 9)",
          "rgb = (120, 255, 60)",
          "Use a list when you plan to append or update."
        ])
      ]),
      L("String Basics", [
        "A string stores text. Names, prompts, passwords, operators, and messages are strings.",
        "Strings are sequences of characters. Python can inspect, slice, search, and clean them.",
        "If a number is inside quote marks, it is text until converted."
      ], "Text that looks numeric is still text until converted.", [
        S("String Methods", [
          "strip() removes extra spaces.",
          "lower() makes text lowercase.",
          "upper() makes text uppercase.",
          "in checks whether text contains another piece of text."
        ])
      ]),
      L("Processing User Text", [
        "User input often includes extra spaces or unexpected capitalization.",
        "For menu choices, it can help to strip spaces and normalize case before comparing.",
        "For operator symbols, strip spaces so a user typing a space around + does not break the comparison."
      ], "Clean text before comparing it.", [
        S("Text Cleanup", [
          "operator = operator.strip()",
          "answer = answer.lower()",
          "name = name.strip()"
        ])
      ], [
        "operator = input(\"Operator: \").strip()",
        "if operator == \"+\":",
        "    print(\"Add\")"
      ].join("\n")),
      L("When Not To Use Lists Yet", [
        "Sometimes a shorter Python feature is not the right choice for the assignment.",
        "If the current material is practicing variables, formulas, and decisions, use those tools unless the assignment says lists are allowed.",
        "Learning the expected pattern matters more than producing the shortest possible code."
      ], "Use the tool the lesson is practicing.", [
        S("Early-Course Discipline", [
          "Use separate variables when lists have not been covered.",
          "Avoid advanced formatting if the instructions say not to format.",
          "Use covered decision structures even if you know another shortcut."
        ])
      ])
    ]
  },
  {
    id: "files",
    title: "Files Errors",
    icon: "file",
    lessons: [
      L("Why Files Matter", [
        "Variables disappear when a program ends. Files can keep data after the program stops.",
        "Programs can write output to files, read input from files, and process stored records.",
        "File work is important when a program needs more than one run or more data than a user should type each time."
      ], "Files let data persist beyond one run.", [
        S("File Uses", [
          "Save results.",
          "Read lists of values.",
          "Store records.",
          "Create reports."
        ])
      ]),
      L("Reading And Writing", [
        "Python can open files for reading or writing. The with statement is helpful because it closes the file automatically.",
        "Writing stores text in a file. Reading brings file contents into the program.",
        "A newline character, written as \\n, moves file output to the next line."
      ], "Use with open(...) so Python handles closing.", [
        S("Modes", [
          "\"r\" means read.",
          "\"w\" means write and replace.",
          "\"a\" means append.",
          "Text files store strings."
        ])
      ], [
        "with open(\"notes.txt\", \"w\") as file:",
        "    file.write(\"Python practice\\n\")"
      ].join("\n")),
      L("Records And Fields", [
        "A field is one piece of data. A record is a group of related fields.",
        "For example, name, quantity, and price can be fields in one product record.",
        "Files can contain many records, and programs can process each record in order."
      ], "Field is one value; record is a related group.", [
        S("Record Examples", [
          "Student record: name, score, grade.",
          "Product record: itemName, quantity, price.",
          "Sale record: date, customer, total."
        ])
      ]),
      L("Exceptions", [
        "An exception is an error that happens while the program is running.",
        "Converting the text hello to an integer causes a ValueError. Opening a missing file can cause a file error.",
        "Python can handle exceptions with try and except, but use this only when the lesson has reached it."
      ], "Exceptions handle runtime problems.", [
        S("Common Runtime Problems", [
          "User types text when a number is required.",
          "File does not exist.",
          "Division by zero.",
          "A variable is used before assignment."
        ])
      ]),
      L("Validation Before Exceptions", [
        "Validation checks known rules before a calculation. Exceptions handle problems that happen during execution.",
        "For beginner work, simple validation often comes before exception handling.",
        "A clear validation message helps the user fix the input."
      ], "Validation prevents expected bad input.", [
        S("Validation Messages", [
          "Please enter a positive quantity.",
          "Number must be from 0 through 500.",
          "Operator must be +, -, *, or /.",
          "Cannot divide by zero."
        ])
      ])
    ]
  }
];

function addDeepLessons() {
  const append = (topicId, lessons) => {
    const topic = topics.find((item) => item.id === topicId);
    if (topic) topic.lessons.push(...lessons);
  };

  append("map", [
    L("Trace Before You Trust", [
      "Tracing means walking through the plan one step at a time and writing down what each variable contains after each step.",
      "A trace catches mistakes that still look reasonable at first glance. For example, a total can be calculated before all inputs are entered, or a counter can increase in the wrong place.",
      "Use tracing on pseudocode before building in RAPTOR. If the table does not match your expected answer, the flowchart will not fix it by itself."
    ], "A trace table proves the plan before the program runs.", [
      S("Trace Columns To Use", [
        "Step or line number.",
        "Input value used at that step.",
        "Each important variable after the step runs.",
        "The condition result when an If or loop is reached.",
        "Any output that would be shown."
      ]),
      S("Good First Test Values", [
        "Use small whole numbers for formulas.",
        "Use one value that makes each branch true.",
        "Use one value that makes each branch false.",
        "Use a boundary value such as 0, 1, 50, or 100 when a range is involved."
      ])
    ]),
    L("From Rough Idea To Exact Logic", [
      "A rough idea says what you want. Exact logic says how the computer can do it. The difference matters because computers cannot guess missing steps.",
      "Rough: calculate the bill. Exact: Set subtotal = price * quantity, Set tax = subtotal * taxRate, Set total = subtotal + tax.",
      "Before translating to Python, rewrite every vague verb into a specific action: input, assignment, output, decision, or loop."
    ], "Replace vague verbs with exact program actions.", [
      S("Rewrite Examples", [
        "Get the number -> Write prompt, then Input number.",
        "Figure out discount -> If quantity meets rule, Set discountRate.",
        "Show answer -> Write a labeled result.",
        "Keep asking -> While input is invalid, ask again."
      ])
    ])
  ]);

  append("basics", [
    L("Inside The CPU Cycle", [
      "The CPU repeatedly fetches an instruction, decodes what it means, and executes it. This is why program order matters.",
      "If a program tries to use a variable before an input or assignment gives it a value, the instruction order is wrong.",
      "Pseudocode should read in the same order the computer must act: prepare variables, collect inputs, calculate, decide, repeat when needed, then output."
    ], "Instruction order is part of the logic.", [
      S("Order Problems To Watch", [
        "Output before calculation.",
        "Calculation before input.",
        "Loop counter updated after the wrong statement.",
        "Decision written before the value being tested exists."
      ])
    ]),
    L("Bits, Bytes, And Data Meaning", [
      "Computers store data as patterns of bits, but the program decides what those patterns mean.",
      "The same stored value can be treated as a number, character, Boolean, or text depending on the type and operation.",
      "This is why choosing a type matters. You cannot add a name like a number, and you cannot compare text input numerically until it has been converted."
    ], "Data type tells the program how to treat a value.", [
      S("Type Questions", [
        "Will math be performed on this value?",
        "Can the value contain decimals?",
        "Is it only true or false?",
        "Should leading zeros or letters be preserved as text?"
      ])
    ]),
    L("Source Code, Runtime, And Bugs", [
      "Source code is the text you write. Runtime is when the program is actually executing.",
      "A syntax error prevents the program from running because the language rules were broken. A runtime error happens while running. A logic error runs but gives the wrong answer.",
      "Beginner debugging gets easier when you name the bug type instead of treating every issue the same."
    ], "Syntax errors stop the language; logic errors stop the answer.", [
      S("Bug Types", [
        "Syntax: missing quote, colon, parenthesis, or wrong indentation.",
        "Runtime: invalid conversion, missing file, or division by zero.",
        "Logic: wrong formula, wrong branch, or wrong loop update."
      ])
    ])
  ]);

  append("design", [
    L("Documentation And Program Style", [
      "Documentation explains a program to people. Internal documentation appears in the program as comments. External documentation can be planning notes, IPO charts, test cases, or user instructions.",
      "Good documentation does not restate obvious syntax. It explains purpose, assumptions, formulas, and unusual choices.",
      "A short comment beside a formula can be valuable when the formula came from the problem statement or a conversion rule."
    ], "Document the why, not every tiny syntax detail.", [
      S("Useful Documentation", [
        "Purpose of the program.",
        "Required inputs and expected outputs.",
        "Important formulas and constants.",
        "Known limits or validation rules.",
        "Test cases used to verify the result."
      ])
    ]),
    L("Hierarchy Charts", [
      "A hierarchy chart breaks a larger program into modules before the detailed pseudocode is written.",
      "The top box is the whole program. Lower boxes are tasks such as get input, calculate total, display report, or validate data.",
      "This chart is helpful before functions because it shows which pieces of work should be separated."
    ], "A hierarchy chart shows program parts, not detailed statements.", [
      S("Good Module Names", [
        "getInput",
        "calculateSubtotal",
        "determineDiscount",
        "displayResults",
        "validateQuantity"
      ]),
      S("What To Avoid", [
        "Names that are too vague, such as doStuff.",
        "Modules that mix input, calculation, and output without a reason.",
        "A chart so detailed that it becomes pseudocode."
      ])
    ]),
    L("Flowcharts Before RAPTOR", [
      "A flowchart is the visual version of an algorithm. RAPTOR is one tool for creating and running a flowchart.",
      "Before placing symbols, identify the shape each pseudocode action needs: input/output, assignment, selection, loop, or call.",
      "If the pseudocode is clear, the flowchart becomes a translation job instead of a guessing job."
    ], "Match each pseudocode action to a flowchart symbol.", [
      S("Shape Matching", [
        "Input and Write use input/output symbols.",
        "Set statements use assignment symbols.",
        "If and Else use selection diamonds.",
        "While and repeat patterns use loop structures.",
        "Module calls use call symbols."
      ])
    ])
  ]);

  append("pseudocode", [
    L("Refining Pseudocode", [
      "First-draft pseudocode can be a little rough, but final pseudocode should be specific enough to translate without invention.",
      "A line like calculate total is not finished. A line like Set total = subtotal + tax is finished because it gives the exact operation.",
      "Refinement means adding variable names, formulas, branch conditions, loop conditions, and output labels."
    ], "Finished pseudocode can be translated line by line.", [
      S("Refinement Checklist", [
        "Every input has a variable name.",
        "Every formula has an assignment target.",
        "Every If has a clear Boolean condition.",
        "Every loop has a clear stopping condition.",
        "Every output has a label or clear value."
      ])
    ]),
    L("Pseudocode Blocks And Indentation", [
      "Indentation shows which statements belong inside a decision, loop, or function.",
      "In pseudocode, indentation is not about Python syntax yet. It is about showing ownership: what happens only if the condition is true, what repeats, and what happens after the block ends.",
      "End If, End While, and End Function make the closing point obvious, especially before translating to RAPTOR."
    ], "Indentation shows what belongs inside a block.", [
      S("Block Example", [
        "If age >= 18 Then",
        "  Write \"Adult\"",
        "Else",
        "  Write \"Minor\"",
        "End If"
      ])
    ]),
    L("Desk Checking Pseudocode", [
      "Desk checking is testing the algorithm by hand before running it in software.",
      "Choose test inputs, walk through the pseudocode, and record each variable after every important line. The goal is to find logic errors early.",
      "Desk checking is especially useful for loops because you can see whether the loop starts correctly, updates correctly, and stops correctly."
    ], "Desk checking is manual testing of the algorithm.", [
      S("Desk Check Steps", [
        "Pick input values with an expected answer.",
        "List variables across the top of a table.",
        "Run each pseudocode line by hand.",
        "Mark which branch or loop path was taken.",
        "Compare final output with the expected answer."
      ])
    ])
  ]);

  append("variables", [
    L("Naming Variables Well", [
      "A variable name should describe the value it stores. Clear names make pseudocode, RAPTOR, and Python easier to read.",
      "Avoid names such as x, y, stuff, or number when the value has a real meaning. Use hoursWorked, payRate, subtotal, tax, or averageScore.",
      "In Python, common style uses lowercase words joined by underscores, such as hours_worked. In pseudocode, many classes accept camelCase, such as hoursWorked."
    ], "A good variable name explains the data.", [
      S("Naming Rules", [
        "Start with a letter or underscore.",
        "Use letters, numbers, and underscores.",
        "Do not use spaces.",
        "Do not use reserved language words.",
        "Keep names descriptive but not painfully long."
      ])
    ]),
    L("Constants Versus Variables", [
      "A variable can change while the program runs. A constant represents a value that should stay the same.",
      "Tax rates, conversion factors, maximum attempts, and menu option numbers are common constants.",
      "In Python, constants are often written in uppercase by convention. The language does not lock them automatically, but the style tells readers not to change them."
    ], "Use constants for fixed values with meaning.", [
      S("Examples", [
        "TAX_RATE = 0.0825",
        "LITERS_PER_GALLON = 3.78541",
        "MAX_SCORE = 100",
        "FREE_SHIPPING_MINIMUM = 50"
      ])
    ], [
      "TAX_RATE = 0.0825",
      "subtotal = price * quantity",
      "tax = subtotal * TAX_RATE"
    ].join("\n")),
    L("Conversion And Type Safety", [
      "Python input starts as text. Numeric calculations require conversion with int or float.",
      "Use int for whole-number counts and float for measurements, money calculations, averages, rates, and values that may contain decimals.",
      "A conversion should happen close to the input so the rest of the program can use the value as the intended type."
    ], "Convert text input before numeric math.", [
      S("Conversion Choices", [
        "int(input(...)) for whole numbers.",
        "float(input(...)) for decimal values.",
        "str(value) when combining a number into a text message.",
        "Keep codes such as zip codes as strings if math is not needed."
      ])
    ], [
      "quantity = int(input(\"Quantity: \"))",
      "price = float(input(\"Price: \"))",
      "subtotal = quantity * price"
    ].join("\n"))
  ]);

  append("operators", [
    L("Precedence Deep Dive", [
      "Operator precedence decides which parts of an expression happen first.",
      "Parentheses happen before multiplication, division, floor division, and modulus. Addition and subtraction come after those. Comparisons happen after arithmetic.",
      "When a formula comes from a word problem, use parentheses to make your intention clear even when precedence would already work."
    ], "Parentheses make formulas safer to read.", [
      S("Precedence Reminders", [
        "Parentheses first.",
        "Multiplication, division, floor division, and modulus before addition and subtraction.",
        "Comparisons create true or false results.",
        "Boolean operators combine true or false results."
      ])
    ], [
      "average = (score1 + score2 + score3) / 3",
      "total = subtotal + (subtotal * tax_rate)"
    ].join("\n")),
    L("Modulo Patterns", [
      "The modulus operator gives the remainder after division. It is useful for divisibility checks, odd or even checks, and cycling through repeated positions.",
      "A number is even when number % 2 equals 0. A value is divisible by 5 when value % 5 equals 0.",
      "In beginner word problems, modulus often appears when breaking an amount into coins or checking whether a number divides evenly."
    ], "Modulo answers the remainder question.", [
      S("Common Uses", [
        "Check even or odd.",
        "Find leftover units after grouping.",
        "Convert cents into coins.",
        "Cycle through repeating positions."
      ])
    ], [
      "if number % 2 == 0:",
      "    print(\"Even\")",
      "else:",
      "    print(\"Odd\")"
    ].join("\n")),
    L("Compound Updates", [
      "A compound update changes a variable using its current value. Totals, counters, and accumulators all use this idea.",
      "Set count = count + 1 means the new count is one more than the old count. Set total = total + amount means the new total includes another amount.",
      "In Python, += is a shorter form, but the longer version is often clearer while learning loops."
    ], "Counters and totals reuse their old value.", [
      S("Update Patterns", [
        "count = count + 1",
        "total = total + price",
        "balance = balance - withdrawal",
        "largest = value when value is greater than largest"
      ])
    ], [
      "total = 0",
      "total = total + price",
      "count = count + 1"
    ].join("\n"))
  ]);

  append("python", [
    L("Python Statements And Indentation", [
      "Python uses indentation to show which statements belong inside decisions, loops, and functions.",
      "A colon starts many blocks, such as if, else, elif, while, for, def, try, and except. The indented lines after the colon are the block body.",
      "When translating from pseudocode, each indented pseudocode block usually becomes an indented Python block."
    ], "In Python, indentation is structure.", [
      S("Block Starters", [
        "if condition:",
        "elif condition:",
        "else:",
        "while condition:",
        "for item in sequence:",
        "def function_name():"
      ])
    ], [
      "if score >= 70:",
      "    print(\"Pass\")",
      "else:",
      "    print(\"Try again\")"
    ].join("\n")),
    L("Formatted Output", [
      "Output should be labeled so the user knows what each number means.",
      "Python f-strings let you place variable values inside a message. Formatting can also control decimal places when the lesson allows it.",
      "For money and averages, two decimal places are usually easier to read than a long floating-point value."
    ], "A clear output label is part of a good program.", [
      S("Output Habits", [
        "Label every displayed value.",
        "Use consistent wording.",
        "Round or format only when the requirement allows it.",
        "Do not hide input values when the assignment asks for them."
      ])
    ], [
      "total = 12.5",
      "print(f\"Total: ${total:.2f}\")"
    ].join("\n")),
    L("Using Import Statements", [
      "An import statement lets a Python program use code from a module.",
      "The math module contains common math functions and constants. The random module can generate random choices or numbers.",
      "Only import modules that the assignment allows. For early practice, the goal is often to learn the basic logic without extra shortcuts."
    ], "Import modules when the program needs outside tools.", [
      S("Common Beginner Modules", [
        "math for square roots, powers, and constants.",
        "random for random numbers and choices.",
        "datetime for dates and times.",
        "os or pathlib for file paths in larger programs."
      ])
    ], [
      "import math",
      "radius = float(input(\"Radius: \"))",
      "area = math.pi * radius ** 2"
    ].join("\n"))
  ]);

  append("decisions", [
    L("Nested Decisions", [
      "A nested decision is an If statement inside another If statement.",
      "Nesting is useful when the second question should only be asked after the first question is true. For example, check whether a user is a member before checking which member level applies.",
      "Too much nesting can become hard to read. If the tests are separate choices from the same list, an if-elif-else chain may be clearer."
    ], "Nest only when one decision belongs inside another.", [
      S("Nested Example Logic", [
        "If customer is a member, then check member level.",
        "If operator is division, then check denominator.",
        "If score is valid, then determine letter grade.",
        "If login name is correct, then check password."
      ])
    ]),
    L("if-elif-else Chains", [
      "An if-elif-else chain chooses one path from several related choices.",
      "Python checks from top to bottom and runs the first true branch. After one branch runs, the rest of that chain is skipped.",
      "Order matters when ranges overlap. Test the most specific or highest-priority ranges first."
    ], "An if-elif-else chain chooses one matching path.", [
      S("Range Order", [
        "For grades, check A before B before C when using minimum scores.",
        "For price tiers, check the largest threshold first if using greater-than rules.",
        "Use else for the default case when all previous tests are false."
      ])
    ], [
      "if score >= 90:",
      "    grade = \"A\"",
      "elif score >= 80:",
      "    grade = \"B\"",
      "else:",
      "    grade = \"Needs review\""
    ].join("\n")),
    L("Truth Tables", [
      "A truth table lists every true or false combination for a Boolean expression.",
      "AND is true only when both sides are true. OR is true when at least one side is true. NOT reverses a Boolean value.",
      "Truth tables are useful when a validation rule feels confusing, especially with outside-range checks."
    ], "AND requires both; OR accepts either.", [
      S("Validation Rules", [
        "Valid from 0 through 500: value >= 0 AND value <= 500.",
        "Invalid outside 0 through 500: value < 0 OR value > 500.",
        "Menu option valid for A or B: option == \"A\" OR option == \"B\".",
        "Not finished yet: NOT done."
      ])
    ])
  ]);

  append("loops", [
    L("Pre-Test Loop Thinking", [
      "A while loop is a pre-test loop because it checks the condition before running the body.",
      "If the condition starts false, the body may not run at all. This is correct for many programs, such as reading records until there are no more records.",
      "When the body must run at least once, initialize the loop condition carefully or use a priming read pattern."
    ], "A while loop can run zero times.", [
      S("Pre-Test Questions", [
        "What value makes the loop begin?",
        "What value makes the loop stop?",
        "Where is the tested value updated?",
        "Can the condition become false?"
      ])
    ]),
    L("Sentinel Loops", [
      "A sentinel value is a special input that tells the loop to stop. The sentinel is not normal data and should not be processed as if it were.",
      "For example, a user might enter -1 to stop entering scores. The program should not add -1 into the score total.",
      "Sentinel loops often use a priming read: get the first value before the loop, process while it is not the sentinel, then read the next value at the end of the loop."
    ], "Do not process the sentinel as real data.", [
      S("Sentinel Pattern", [
        "Input first value.",
        "While value is not sentinel.",
        "Process value.",
        "Input next value.",
        "End While."
      ])
    ], [
      "score = int(input(\"Score or -1 to stop: \"))",
      "while score != -1:",
      "    total = total + score",
      "    score = int(input(\"Score or -1 to stop: \"))"
    ].join("\n")),
    L("Nested Loops", [
      "A nested loop is a loop inside another loop. The inner loop completes all its repetitions for each single repetition of the outer loop.",
      "Nested loops are common for tables, rows and columns, repeated groups of input, and two-dimensional data.",
      "Trace nested loops with small values first, such as 2 rows and 3 columns, because the number of repetitions grows quickly."
    ], "Inner loop runs completely for each outer loop cycle.", [
      S("Nested Loop Uses", [
        "Print a table of rows and columns.",
        "Process scores for several students.",
        "Compare items in sorting algorithms.",
        "Visit every cell in a grid."
      ])
    ]),
    L("Input Validation Loops", [
      "A validation loop repeats while input is invalid. This lets the user correct a value before the program calculates with it.",
      "The condition should describe the bad input, not the good input, when the wording is while invalid.",
      "After displaying the error message, the loop must input the value again. Otherwise the same bad value will repeat forever."
    ], "A validation loop repeats while the value is bad.", [
      S("Validation Pattern", [
        "Input value.",
        "While value is invalid.",
        "Write a clear error message.",
        "Input value again.",
        "End While."
      ])
    ], [
      "quantity = int(input(\"Quantity: \"))",
      "while quantity < 0:",
      "    print(\"Quantity cannot be negative.\")",
      "    quantity = int(input(\"Quantity: \"))"
    ].join("\n"))
  ]);

  append("functions", [
    L("Void And Value-Returning Functions", [
      "A void function performs a task but does not send a value back. A value-returning function uses return to send one value back to the caller.",
      "Display functions are often void. Calculation functions are often value-returning because the caller needs the result.",
      "In pseudocode, make the difference clear by using Call for a void function and Set variable = functionName(...) when a value is returned."
    ], "Use return when the caller needs a result.", [
      S("Design Choices", [
        "getInput can return a value.",
        "calculateTax can return tax.",
        "displayResults can be void.",
        "validateQuantity can return true or false."
      ])
    ], [
      "def calculate_tax(subtotal, tax_rate):",
      "    return subtotal * tax_rate"
    ].join("\n")),
    L("Arguments And Parameters", [
      "A parameter is the variable name listed in the function definition. An argument is the actual value sent into the function call.",
      "Parameters let a function work with different values without relying on global variables.",
      "When translating from pseudocode, list the data the function needs inside the parentheses."
    ], "Arguments are sent; parameters receive.", [
      S("Example Match", [
        "Definition: calculateTotal(price, quantity).",
        "Parameters: price and quantity.",
        "Call: calculateTotal(12.99, 4).",
        "Arguments: 12.99 and 4."
      ])
    ]),
    L("Local Scope", [
      "A local variable is created inside a function and normally belongs only to that function.",
      "Local scope helps keep functions independent. A function should receive what it needs through parameters and return what the caller needs.",
      "Relying on global variables can make beginner programs harder to test because any part of the program may change the value."
    ], "Keep function data local when possible.", [
      S("Scope Habits", [
        "Pass values into functions as parameters.",
        "Return calculated results.",
        "Avoid changing global variables from inside many functions.",
        "Use clear names even for local variables."
      ])
    ]),
    L("Recursion Preview", [
      "Recursion happens when a function calls itself. It is usually taught after loops and functions because it requires careful stopping logic.",
      "A recursive function needs a base case that stops the calls. Without a base case, recursion continues until the program fails.",
      "For beginner work, loops are usually the first tool for repetition. Recursion is a later way to solve certain repeated or nested problems."
    ], "Recursion needs a base case.", [
      S("Recursion Parts", [
        "Base case: the condition that stops.",
        "Recursive case: the function calls itself with a smaller problem.",
        "Progress: each call moves closer to the base case."
      ])
    ])
  ]);

  append("raptor", [
    L("RAPTOR Build Order", [
      "Build a RAPTOR chart from the top down. Start with Start and End, then add the main actions between them in the same order as the pseudocode.",
      "Place input before calculations that use the input. Place decisions before branch-only calculations. Place output after the value is ready.",
      "Run the chart with simple test values after each major section instead of waiting until the whole chart is finished."
    ], "Add symbols in the same order the logic runs.", [
      S("Build Checklist", [
        "Start with the pseudocode beside you.",
        "Add input symbols for user values.",
        "Add assignment symbols for Set statements.",
        "Add selection symbols for If statements.",
        "Add loop structures for repeated logic.",
        "Add output symbols for final messages."
      ])
    ]),
    L("RAPTOR Input And Output Details", [
      "RAPTOR input symbols store user-entered values in variables. Output symbols display text, values, or both.",
      "Use prompts so the user knows what to enter. Keep output labels clear so the result is not just an unlabeled number.",
      "If output combines text and variables, check the tool's expression rules carefully and test with small values."
    ], "Input stores values; output communicates results.", [
      S("Common Output Needs", [
        "A prompt before input.",
        "A label before a result.",
        "Input echo when required.",
        "A final summary after calculations."
      ])
    ]),
    L("RAPTOR Selection Details", [
      "A selection symbol asks a true-or-false question and sends control down one of two paths.",
      "The true path should contain statements for the condition being true. The false path should contain the else logic or continue when no else action is needed.",
      "After the branches finish, the flow joins again so the rest of the program can continue."
    ], "A RAPTOR selection is an If decision.", [
      S("Selection Checks", [
        "The condition uses a comparison.",
        "The true branch matches the true wording.",
        "The false branch matches otherwise logic.",
        "Both branches rejoin before the next shared step."
      ])
    ]),
    L("RAPTOR Loop Details", [
      "A RAPTOR loop repeats a group of symbols based on a condition.",
      "The loop body should contain the work being repeated and the update that moves the loop toward stopping.",
      "If a loop uses a counter, initialize the counter before the loop, test it in the loop condition, and update it inside the loop."
    ], "Initialize, test, update: all three matter.", [
      S("Loop Symbol Planning", [
        "What starts the loop?",
        "What condition controls the loop?",
        "Which symbols repeat?",
        "Where does the update happen?",
        "What happens after the loop stops?"
      ])
    ]),
    L("Subcharts And Calls", [
      "A larger RAPTOR program can be divided into subcharts. A call symbol runs a named subchart.",
      "Subcharts match the same modular design idea as functions. They help keep the main chart readable when a program has repeated or separate tasks.",
      "Use subcharts for clear tasks such as input, calculation, validation, or display when the assignment allows modular design."
    ], "A call symbol can run a separate subchart.", [
      S("Subchart Candidates", [
        "getInput",
        "validateInput",
        "calculateResult",
        "displaySummary",
        "processOneRecord"
      ])
    ])
  ]);

  append("patterns", [
    L("Tax, Discount, And Shipping Pattern", [
      "Many business word problems follow the same path: input quantity and price, calculate subtotal, apply a discount or fee rule, calculate tax, then display a total.",
      "The safest plan is to calculate each named value separately instead of putting the entire formula into one long expression.",
      "Separate variables make testing easier because you can check subtotal, discount, tax, and grand total one at a time."
    ], "Break business totals into named steps.", [
      S("Common Steps", [
        "Input quantity and unit price.",
        "Set subtotal = quantity * unitPrice.",
        "Determine discount or shipping rule.",
        "Set taxableAmount or totalBeforeTax.",
        "Set tax and grandTotal.",
        "Write labeled results."
      ])
    ]),
    L("Range Table Pattern", [
      "Some word problems give a table of ranges. Each range has a different rate, message, grade, or fee.",
      "Translate the table into an if-elif-else chain. Make sure every possible value has exactly one path.",
      "Test one value inside each range and one value on each boundary."
    ], "A range table usually becomes an if-elif-else chain.", [
      S("Boundary Tests", [
        "The smallest valid value.",
        "The largest valid value.",
        "A value exactly on each cutoff.",
        "A value just below each cutoff.",
        "A value just above each cutoff."
      ])
    ]),
    L("Conversion Pattern", [
      "A conversion problem changes a value from one unit to another. The core formula usually multiplies or divides by a conversion factor.",
      "Identify the direction before writing the formula. Miles to kilometers is not the same formula direction as kilometers to miles.",
      "Use a named constant for the conversion factor so the formula reads like the problem."
    ], "Know the direction before choosing multiply or divide.", [
      S("Conversion Planning", [
        "Input the original amount.",
        "Name the conversion factor.",
        "Set convertedAmount using the correct direction.",
        "Write both the original and converted values with labels."
      ])
    ], [
      "MILES_TO_KM = 1.60934",
      "miles = float(input(\"Miles: \"))",
      "kilometers = miles * MILES_TO_KM"
    ].join("\n")),
    L("Edge Case Testing", [
      "An edge case is a value at or near a limit. Edge cases often reveal mistakes in comparison operators.",
      "If free shipping begins at 50 items, test 49, 50, and 51. If a valid score is 0 through 100, test -1, 0, 100, and 101.",
      "For division, zero is an important edge case because it can break the program if used as the denominator."
    ], "Test the exact boundary and both sides of it.", [
      S("Edge Case Targets", [
        "Minimum valid value.",
        "Maximum valid value.",
        "One below the minimum.",
        "One above the maximum.",
        "Zero when division or counts are involved."
      ])
    ])
  ]);

  append("calculator", [
    L("Menu-Driven Calculator Flow", [
      "A calculator problem often uses a menu so the user can choose an operation.",
      "The program should display the menu, input the choice, input the needed numbers, select the matching operation, and display the result.",
      "If division is chosen, check the denominator before calculating. If the menu choice is invalid, display a helpful message."
    ], "Menu choice controls the calculation path.", [
      S("Calculator IPO", [
        "Input: operation choice, first number, second number.",
        "Processing: choose operation, check division, calculate result.",
        "Output: result or error message."
      ])
    ]),
    L("Guarding Division", [
      "Division by zero is a runtime error in Python and an invalid calculation in most beginner programs.",
      "The denominator is the second number in num1 / num2. Check num2 before performing division.",
      "The zero check belongs inside the division branch, because addition, subtraction, and multiplication do not need it."
    ], "Check the denominator before division.", [
      S("Decision Order", [
        "If operator is division.",
        "Then If second number is zero.",
        "Write cannot divide by zero.",
        "Else calculate division result.",
        "End If."
      ])
    ], [
      "if operator == \"/\":",
      "    if num2 == 0:",
      "        print(\"Cannot divide by zero.\")",
      "    else:",
      "        print(num1 / num2)"
    ].join("\n")),
    L("Calculator Testing Table", [
      "A calculator should be tested once for every operation and once for invalid input.",
      "Use values with easy mental answers so a wrong operator is obvious. For example, 8 and 2 produce 10, 6, 16, and 4 for the four basic operations.",
      "Also test division by zero and an invalid menu option so the error paths are proven."
    ], "One test should cover each operation path.", [
      S("Minimum Tests", [
        "Addition with a known sum.",
        "Subtraction with a known difference.",
        "Multiplication with a known product.",
        "Division with a known quotient.",
        "Division by zero.",
        "Invalid menu choice."
      ])
    ])
  ]);

  append("collections", [
    L("Parallel Lists", [
      "Parallel lists are separate lists where matching indexes describe the same record.",
      "For example, names[0], scores[0], and grades[0] could all describe the same student. The index is the connection.",
      "Parallel lists require careful updates because adding, removing, or sorting one list without the others breaks the relationship."
    ], "Parallel lists match data by index.", [
      S("Parallel List Rules", [
        "Lists should stay the same length.",
        "The same index should refer to the same record.",
        "Update all related lists together.",
        "A dictionary or object may be cleaner later."
      ])
    ]),
    L("Two-Dimensional Lists", [
      "A two-dimensional list stores rows and columns. It is useful for tables, grids, and repeated groups of related values.",
      "Access usually needs two indexes: one for the row and one for the column.",
      "Nested loops are often used to process every value in a two-dimensional list."
    ], "Two-dimensional data uses row and column positions.", [
      S("Table Thinking", [
        "Outer loop controls rows.",
        "Inner loop controls columns.",
        "The first index often chooses the row.",
        "The second index often chooses the column."
      ])
    ], [
      "scores = [[90, 84], [76, 88]]",
      "print(scores[0][1])"
    ].join("\n")),
    L("Dictionaries And Sets", [
      "A dictionary stores key-value pairs. It is useful when a meaningful key, such as a name or code, should lead to a value.",
      "A set stores unique values and is useful when duplicates should be removed or membership should be checked quickly.",
      "Lists are usually taught first because they are simpler sequences. Dictionaries and sets become useful when the problem needs lookup or uniqueness."
    ], "Dictionaries look up by key; sets keep unique values.", [
      S("Use Cases", [
        "List: ordered scores or names.",
        "Dictionary: product code to price.",
        "Set: unique categories entered.",
        "Tuple: fixed group of values."
      ])
    ]),
    L("Searching And Sorting", [
      "Searching finds a target value. Sorting rearranges values into order.",
      "A serial search checks items one at a time until the target is found or the list ends. A binary search is faster but requires the list to already be sorted.",
      "Simple sorting algorithms compare and swap values until the list is in order. Built-in Python sorting is used in real projects, but learning the algorithm builds logic skill."
    ], "Search finds; sort orders.", [
      S("Core Ideas", [
        "Serial search works on unsorted data.",
        "Binary search requires sorted data.",
        "Selection sort repeatedly chooses the next smallest value.",
        "Bubble sort swaps neighboring values that are out of order."
      ])
    ])
  ]);

  append("files", [
    L("Sequential File Processing", [
      "A sequential file is processed from beginning to end. The program reads one line or record, processes it, then moves to the next.",
      "This pattern is common for reports, totals, averages, and record updates.",
      "The same loop rules apply: initialize totals before reading, update totals inside the loop, and display final results after the loop ends."
    ], "Sequential processing reads records in order.", [
      S("Sequential Pattern", [
        "Open the file.",
        "Read the first record or loop through each line.",
        "Process the current record.",
        "Update counters or totals.",
        "Close the file or let with close it.",
        "Display final results."
      ])
    ]),
    L("File Maintenance Concepts", [
      "File maintenance means adding, changing, deleting, or reporting stored records.",
      "A common beginner strategy is to read an original file and write a temporary file with the desired changes. After testing, the temporary file can replace the original.",
      "This approach prevents partially changed records from being mixed into the original file while the program is still processing."
    ], "Maintenance changes records carefully.", [
      S("Maintenance Jobs", [
        "Add a new record.",
        "Update a matching record.",
        "Delete a matching record.",
        "Search for a record.",
        "Print a report from stored records."
      ])
    ]),
    L("try-except Patterns", [
      "A try block contains code that might fail at runtime. An except block handles a specific problem so the program can respond gracefully.",
      "Catch specific exceptions when possible, such as ValueError for failed number conversion or FileNotFoundError for a missing file.",
      "Exception handling does not replace good validation. Use validation for rules you can check directly, and exceptions for problems that happen while Python tries an operation."
    ], "Use try-except for runtime risks.", [
      S("Common Exceptions", [
        "ValueError for invalid numeric conversion.",
        "FileNotFoundError for a missing file.",
        "ZeroDivisionError for division by zero.",
        "IndexError for a list position that does not exist."
      ])
    ], [
      "try:",
      "    number = int(input(\"Number: \"))",
      "except ValueError:",
      "    print(\"Please enter a whole number.\")"
    ].join("\n")),
    L("Object-Oriented Preview", [
      "Object-oriented programming groups data and behavior into objects. A class is a blueprint, and an object is an instance created from that blueprint.",
      "For example, a Student class might store a name and score, and it might have a method that determines the grade.",
      "This topic usually comes after variables, decisions, loops, functions, files, and lists because it combines several earlier ideas."
    ], "A class is a blueprint; an object is an instance.", [
      S("OOP Vocabulary", [
        "Class: blueprint.",
        "Object: item created from a class.",
        "Attribute: data stored in the object.",
        "Method: function that belongs to the object."
      ])
    ]),
    L("Event-Driven Preview", [
      "Event-driven programs respond to actions such as button clicks, menu selections, key presses, or timer ticks.",
      "Instead of running straight from top to bottom once, the program waits for events and runs the matching event handler.",
      "Graphical apps use this style often, but the logic inside each handler still uses variables, decisions, loops, functions, and validation."
    ], "An event handler runs when an event happens.", [
      S("Event Examples", [
        "Button click starts a calculation.",
        "Menu choice opens a screen.",
        "Text box input changes a value.",
        "Timer event updates a display."
      ])
    ])
  ]);
}

addDeepLessons();

let questionCounter = 0;

const manualQuestions = [
  q("map", "Which order best matches the normal planning path?", ["Python -> RAPTOR -> output -> IPO", "Word problem -> IPO -> pseudocode -> RAPTOR -> Python", "Input -> syntax -> compiler -> storage", "Loop -> string -> file -> output"], 1, "The safest path is to understand the story, sort it with IPO, plan with pseudocode, then translate."),
  q("basics", "What does Boolean data represent?", ["Whole numbers only", "Text only", "True or false", "A file record"], 2, "Boolean data has exactly two possible values: true or false."),
  q("design", "The word 'display' in a word problem usually means:", ["Input", "Write", "Declare", "Loop"], 1, "Display, show, print, and output all point to Write or Output."),
  q("pseudocode", "Which pseudocode line is most exact?", ["Calculate total", "Do the math", "Set total = price * quantity", "Find the answer"], 2, "The exact formula makes the step testable and translatable."),
  q("variables", "Which type best fits cups of flour that may include decimals?", ["Integer", "Float", "String", "Boolean"], 1, "Ingredient measurements can have decimals, so Float is the best fit."),
  q("operators", "What does % calculate?", ["A percent automatically", "A remainder", "A string length", "A comparison"], 1, "Modulus gives the remainder after division."),
  q("python", "What does input() return before conversion?", ["Integer", "Float", "String text", "Boolean"], 2, "Python input() returns text first."),
  q("decisions", "Which condition catches a number outside 0 through 500?", ["number >= 0 AND number <= 500", "number < 0 OR number > 500", "number == 0 AND number == 500", "number != 0 OR number != 500"], 1, "Any value below 0 or above 500 is invalid, so OR catches either bad case."),
  q("loops", "What must a loop have to avoid repeating forever?", ["A string variable", "A way for the condition to become false", "A file", "A comment after every line"], 1, "A loop must eventually change something that can stop it."),
  q("functions", "What does return do?", ["Displays a value only", "Sends a value back to the caller", "Creates a loop", "Deletes a variable"], 1, "return gives the caller a value to use later."),
  q("raptor", "Which RAPTOR symbol matches Set total = price * quantity?", ["Input", "Output", "Assignment", "Loop"], 2, "Set statements translate to Assignment symbols."),
  q("patterns", "For recipe scaling, what is the usual scale factor?", ["original / desired", "desired / original", "desired + original", "original % desired"], 1, "Desired amount divided by original amount gives the multiplier."),
  q("calculator", "What must be checked before division?", ["num1 == 0", "num2 == 0", "operator == '+'", "result == 0"], 1, "The second number is the denominator, so check it before dividing."),
  q("collections", "What index is the first item in a Python list?", ["0", "1", "-1", "10"], 0, "Python list indexes start at 0."),
  q("files", "What does a with open(...) block help with?", ["Closing the file properly", "Creating a RAPTOR diamond", "Converting strings to floats", "Choosing a discount rate"], 0, "The with statement handles file cleanup such as closing.")
];

function q(topic, prompt, choices, answer, explanation, lessonIndex = null) {
  questionCounter += 1;
  return { id: `${topic}-${questionCounter}`, topic, lessonIndex, prompt, choices, answer, explanation };
}

function generatedQuestions() {
  const remembers = topics.flatMap((topic) => topic.lessons.map((lesson, lessonIndex) => ({
    topic: topic.id,
    lessonIndex,
    title: lesson.title,
    remember: lesson.remember
  }))).filter((item) => item.remember);
  const allItems = topics.flatMap((topic) => topic.lessons.flatMap((lesson, lessonIndex) =>
    (lesson.sections || []).flatMap((section) => (section.items || []).map((item) => ({
      topic: topic.id,
      lessonIndex,
      title: lesson.title,
      section: section.title,
      item
    })))
  ));
  const questions = [];
  remembers.forEach((item) => {
    const pool = remembers.filter((other) => other.remember !== item.remember).map((other) => other.remember);
    questions.push(makeQuestion(item.topic, item.lessonIndex, `Which takeaway best matches "${item.title}"?`, item.remember, pool, `The key takeaway is: ${item.remember}`));
  });
  allItems.forEach((item) => {
    const pool = allItems.filter((other) => other.item !== item.item).map((other) => other.item);
    questions.push(makeQuestion(item.topic, item.lessonIndex, `Which detail belongs with "${item.title}"?`, item.item, pool, `This detail belongs to ${item.title}.`));
  });
  return questions;
}

function makeQuestion(topic, lessonIndex, prompt, correct, pool, explanation) {
  const choices = makeChoices(correct, pool);
  return {
    id: `${topic}-${lessonIndex}-${prompt.slice(0, 18).replace(/[^a-z0-9]+/gi, "-")}-${Math.random().toString(36).slice(2)}`,
    topic,
    lessonIndex,
    prompt,
    choices,
    answer: choices.indexOf(correct),
    explanation
  };
}

function makeChoices(correct, pool) {
  const unique = [...new Set(pool.filter((item) => item && item !== correct))];
  const picked = shuffle(unique).slice(0, 3);
  while (picked.length < 3) picked.push(["Input receives values.", "Set calculates values.", "Write displays values.", "If chooses a branch."][picked.length]);
  return shuffle([correct, ...picked]);
}

const fullQuestionBank = [...manualQuestions, ...generatedQuestions()];

const manualFlashCards = [
  fc("IPO", "Input, Processing, Output. A planning table for word problems.", "design"),
  fc("Pseudocode", "A plain-language plan for program logic.", "pseudocode"),
  fc("Variable", "A named storage location for a value.", "variables"),
  fc("Integer", "A whole-number type used for counts.", "variables"),
  fc("Float", "A decimal-capable type used for money, rates, and measurements.", "variables"),
  fc("String", "Text data such as names, prompts, and operators.", "variables"),
  fc("Boolean", "A true or false value.", "basics"),
  fc("Assignment", "Putting the value on the right into the variable on the left.", "operators"),
  fc("Comparison", "A true or false check such as operator == '+'.", "operators"),
  fc("Selection", "A decision structure with true and false paths.", "decisions"),
  fc("Loop", "A structure that repeats steps.", "loops"),
  fc("Counter", "A variable that tracks repetitions.", "loops"),
  fc("Accumulator", "A variable that keeps a running total.", "loops"),
  fc("Function", "A named block of statements with one job.", "functions"),
  fc("Argument", "A value passed into a function.", "functions"),
  fc("Return", "A value sent back from a function.", "functions"),
  fc("Input Symbol", "A RAPTOR symbol that receives a user value.", "raptor"),
  fc("Output Symbol", "A RAPTOR symbol that displays text or values.", "raptor"),
  fc("Assignment Symbol", "A RAPTOR symbol that calculates or stores a value.", "raptor"),
  fc("Selection Diamond", "A RAPTOR symbol that asks a yes or no question.", "raptor"),
  fc("Validation", "Checking input before using it.", "decisions"),
  fc("Sentinel", "A special value that means stop.", "loops"),
  fc("List", "A Python sequence that stores multiple values.", "collections"),
  fc("Exception", "A runtime problem that Python can handle with try and except.", "files")
];

const flashCardBank = dedupeCards([...manualFlashCards, ...generatedFlashCards()]);

function fc(term, definition, topic) {
  return { id: `${topic}-${term.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, term, definition, topic };
}

function generatedFlashCards() {
  return topics.flatMap((topic) => topic.lessons.flatMap((lesson, lessonIndex) => {
    const cards = [
      fc(lesson.title, conciseDefinition(lesson.remember || (lesson.body || [])[0] || topic.title), topic.id)
    ];
    (lesson.sections || []).forEach((section, sectionIndex) => {
      const items = (section.items || []).slice(0, 2);
      items.forEach((item, itemIndex) => {
        cards.push({
          id: `${topic.id}-${lessonIndex}-${sectionIndex}-${itemIndex}-${section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          term: `${section.title}: ${shortTerm(item)}`,
          definition: conciseDefinition(item),
          topic: topic.id
        });
      });
    });
    return cards;
  }));
}

function conciseDefinition(text) {
  const cleaned = String(text || "").replace(/\s+/g, " ").trim();
  if (cleaned.length <= 170) return cleaned;
  const sentence = cleaned.match(/^(.{60,170}?[.!?])\s/)?.[1];
  return sentence || `${cleaned.slice(0, 167).trim()}...`;
}

function shortTerm(text) {
  const cleaned = String(text || "").replace(/\s+/g, " ").trim();
  const beforeColon = cleaned.split(":")[0];
  return (beforeColon.length <= 34 ? beforeColon : cleaned.slice(0, 34)).replace(/[.!?]$/, "");
}

function dedupeCards(cards) {
  const seen = new Set();
  return cards.filter((card) => {
    if (seen.has(card.id)) return false;
    seen.add(card.id);
    return true;
  });
}

const state = {
  screen: "home",
  topicId: null,
  lessonIndex: 0,
  quizIndex: 0,
  activeQuestions: [],
  answers: {},
  selected: null,
  quizTopic: null,
  quizSourceLessonIndex: null,
  resultSaved: false,
  flashCards: [],
  flashIndex: 0,
  flashFlipped: false,
  flashFilterTopic: "all",
  searchQuery: "",
  complete: load(STORAGE.complete, {}),
  bookmarks: load(STORAGE.bookmarks, {}),
  savedCards: load(STORAGE.savedCards, {})
};

function load(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function svg(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.exam}</svg>`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function topicById(id) {
  return topics.find((topic) => topic.id === id) || topics[0];
}

function progress() {
  const totalLessons = topics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const doneLessons = Object.keys(state.complete).length;
  const bestQuiz = load(STORAGE.bestQuiz, 0);
  const stats = load(STORAGE.stats, {});
  const attempts = Object.values(stats).reduce((sum, item) => sum + (item.attempts || 0), 0);
  return { totalLessons, doneLessons, bestQuiz, attempts };
}

function weakAreas() {
  const stats = load(STORAGE.stats, {});
  const scored = topics.map((topic) => {
    const item = stats[topic.id];
    if (!item || item.total < 3) return null;
    const score = Math.round((item.correct / item.total) * 100);
    return { topic, score, total: item.total };
  }).filter(Boolean);
  return scored.sort((a, b) => a.score - b.score || b.total - a.total).slice(0, 3);
}

function focusNextTarget() {
  const weak = weakAreas()[0];
  if (weak) return { topicId: weak.topic.id, score: weak.score };
  const firstOpen = topics.flatMap((topic) => topic.lessons.map((_, lessonIndex) => ({ topic, lessonIndex })))
    .find((item) => !state.complete[`${item.topic.id}:${item.lessonIndex}`]);
  if (firstOpen) return { topicId: firstOpen.topic.id, lessonIndex: firstOpen.lessonIndex };
  return { topicId: topics[0].id, lessonIndex: 0 };
}

function render() {
  const app = document.getElementById("app");
  if (state.screen === "topic") app.innerHTML = renderTopic();
  else if (state.screen === "lesson") app.innerHTML = renderLesson();
  else if (state.screen === "quiz") app.innerHTML = renderQuiz();
  else if (state.screen === "flashcards") app.innerHTML = renderFlashCards();
  else if (state.screen === "flashSubjects") app.innerHTML = renderFlashSubjectPicker();
  else if (state.screen === "search") app.innerHTML = renderSearch();
  else app.innerHTML = renderHome();
  wire();
  animateStats();
}

function topbar(title, right = "info") {
  const rightIcon = right === "starGold" ? "star" : right;
  const rightAction = rightIcon === "star" ? "star" : rightIcon;
  const rightClass = right === "starGold" ? "gold" : "";
  const back = state.screen === "home" ? "<div></div>" : `<button class="icon-button" data-action="back" aria-label="Back">${svg("back")}</button>`;
  return `
    <header class="topbar">
      ${back}
      <div><h1 class="title">${escapeHtml(title)}</h1></div>
      <button class="icon-button ${rightClass}" data-action="${rightAction}" aria-label="${rightAction}">${svg(rightIcon)}</button>
    </header>
  `;
}

function renderHome() {
  const p = progress();
  const pct = Math.round((p.doneLessons / p.totalLessons) * 100);
  return `
    <main class="screen">
      ${topbar("BringItOnPython")}
      <p class="subtitle">Python and pseudocode swipe study</p>
      <section class="hero-stat" aria-label="Study stats">
        <div class="stat-card">
          <div class="stat-ring" style="--value:${pct}%;"><div class="stat-ring-inner"><strong>${p.doneLessons}/${p.totalLessons}</strong></div></div>
          <span>lessons</span>
        </div>
        <div class="stat-card">
          <div class="stat-ring readiness-build" style="--value:${Math.min(100, p.attempts * 8)}%;"><div class="stat-ring-inner"><strong>${p.attempts}</strong></div></div>
          <span>quiz runs</span>
        </div>
        <div class="stat-card">
          <div class="stat-ring" style="--value:${p.bestQuiz}%;"><div class="stat-ring-inner"><strong>${p.bestQuiz}%</strong></div></div>
          <span>best quiz</span>
        </div>
      </section>
      ${renderStudyDashboard(p)}
      ${renderHomeBookmarks()}
      <section class="topic-grid">
        <button class="topic-card feature-card" data-action="startDailyDrill" aria-label="Quick Drill">
          <span class="topic-icon">${svg("exam")}</span>
          <span>Quick Drill</span>
        </button>
        <button class="topic-card feature-card" data-action="openSearch" aria-label="Search">
          <span class="topic-icon">${svg("search")}</span>
          <span>Search</span>
        </button>
        <button class="topic-card feature-card" data-action="startFlashCards" aria-label="Flash Cards">
          <span class="topic-icon">${svg("cards")}</span>
          <span>Flash Cards</span>
        </button>
        ${topics.map((topic) => `
          <button class="topic-card ${topic.id === "map" ? "feature-card" : ""}" data-topic="${topic.id}" aria-label="${escapeHtml(topic.title)}">
            <span class="topic-icon">${svg(topic.icon)}</span>
            <span>${escapeHtml(topic.title)}</span>
          </button>
        `).join("")}
      </section>
      <p class="authorship-notice">Copyright 2026 Bianca Russek. All rights reserved.</p>
    </main>
  `;
}

function renderStudyDashboard(p) {
  const weak = weakAreas();
  const focus = focusNextTarget();
  const focusTopic = topicById(focus.topicId);
  const focusLesson = typeof focus.lessonIndex === "number" ? focusTopic.lessons[focus.lessonIndex] : null;
  const focusNote = weak.length
    ? "These are the subjects with the lowest recent quiz accuracy."
    : "Take a quiz or keep reading lessons to build a clearer weak-area map.";
  return `
    <section class="study-dashboard" aria-label="Study dashboard">
      <div class="readiness-card">
        <div>
          <span>Focus Next</span>
          <strong>${escapeHtml(focusTopic.title)}</strong>
          <small>${escapeHtml(focusLesson ? focusLesson.title : focusNote)}</small>
        </div>
        <button class="mini-action" data-focus-topic="${focusTopic.id}" data-focus-lesson="${typeof focus.lessonIndex === "number" ? focus.lessonIndex : ""}">Open</button>
      </div>
      <div class="weak-panel">
        <div class="section-heading"><h2>Weak Areas</h2><span>${weak.length}</span></div>
        ${weak.length ? weak.map((item) => `
          <button class="weak-row" data-topic="${item.topic.id}">
            <span>${escapeHtml(item.topic.title)}</span>
            <strong>${item.score}%</strong>
          </button>
        `).join("") : `<p class="empty-note">Take a quick drill or subject quiz to reveal what needs the most review.</p>`}
      </div>
    </section>
  `;
}

function renderHomeBookmarks() {
  const items = Object.keys(state.bookmarks).map((key) => {
    const [topicId, lessonText] = key.split(":");
    const topic = topicById(topicId);
    const lessonIndex = Number(lessonText);
    const lesson = topic.lessons[lessonIndex];
    return lesson ? { topic, lesson, lessonIndex } : null;
  }).filter(Boolean).slice(0, 4);
  if (!items.length) return "";
  return `
    <section class="bookmark-panel">
      <div class="section-heading"><h2>Saved Lessons</h2><span>${items.length}</span></div>
      <div class="bookmark-list">
        ${items.map((item) => `
          <button class="bookmark-row" data-bookmark-topic="${item.topic.id}" data-bookmark-lesson="${item.lessonIndex}">
            <span class="bookmark-star">${svg("star")}</span>
            <span><strong>${escapeHtml(item.lesson.title)}</strong><small>${escapeHtml(item.topic.title)}</small></span>
            <span class="chevron">&rsaquo;</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}

function renderTopic() {
  const topic = topicById(state.topicId);
  return `
    <main class="screen topic-screen">
      ${topbar(topic.title)}
      <section class="list">
        ${topic.lessons.map((lesson, index) => `
          <button class="lesson-row" data-lesson="${index}">
            <span class="mini-icon">${state.complete[`${topic.id}:${index}`] ? svg("check") : index + 1}</span>
            <strong>${escapeHtml(lesson.title)}</strong>
            <span class="chevron">&rsaquo;</span>
          </button>
        `).join("")}
        <button class="lesson-row" data-action="topicQuiz">
          <span class="mini-icon">Q</span>
          <strong>Quiz: ${escapeHtml(topic.title)}</strong>
          <span class="chevron">&rsaquo;</span>
        </button>
      </section>
    </main>
  `;
}

function renderLesson() {
  const topic = topicById(state.topicId);
  const lesson = topic.lessons[state.lessonIndex];
  const key = `${topic.id}:${state.lessonIndex}`;
  const bookmarked = Boolean(state.bookmarks[key]);
  return `
    <main class="screen reader">
      ${topbar(topic.title, bookmarked ? "starGold" : "star")}
      <button class="return-home-link return-home-top" data-action="goHome">Return Home</button>
      <article class="reader-card" data-swipe="lesson">
        <h2>${escapeHtml(lesson.title)}</h2>
        ${(lesson.body || []).map((para) => `<p>${escapeHtml(para)}</p>`).join("")}
        ${renderLessonSections(lesson.sections)}
        ${lesson.remember ? `<div class="memory-box">${escapeHtml(lesson.remember)}</div>` : ""}
        ${lesson.code ? `<pre class="code-strip">${escapeHtml(lesson.code)}</pre>` : ""}
      </article>
      ${dots(topic.lessons.length, state.lessonIndex)}
      <nav class="bottom-nav">
        <button class="pill-button secondary return-home-bottom" data-action="goHome">Return Home</button>
        <button class="pill-button secondary" data-action="markDone">Done</button>
        <button class="pill-button" data-action="lessonQuiz">Quiz</button>
        <button class="pill-button secondary" data-action="nextLesson">Next Lesson</button>
      </nav>
    </main>
  `;
}

function renderLessonSections(sections = []) {
  if (!sections.length) return "";
  return `
    <div class="lesson-sections">
      ${sections.map((section) => `
        <section class="lesson-section">
          <h3>${escapeHtml(section.title)}</h3>
          <ul>${section.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </section>
      `).join("")}
    </div>
  `;
}

function renderQuiz() {
  const questions = state.activeQuestions;
  const current = questions[state.quizIndex];
  if (!current) return renderResults(questions);
  const record = state.answers[current.id];
  const checked = Boolean(record);
  const selected = checked ? record.selected : state.selected;
  return `
    <main class="screen quiz-screen" data-swipe="quiz">
      ${topbar(quizTitle())}
      <section class="quiz-panel">
        <div class="quiz-circles">${questions.map((_, index) => `<span class="${index === state.quizIndex ? "active" : ""} ${state.answers[questions[index].id] ? "done" : ""}">${index + 1}</span>`).join("")}</div>
        <p class="question">${state.quizIndex + 1}. ${escapeHtml(current.prompt)}</p>
        <section class="answer-list">
          ${current.choices.map((choice, index) => {
            let cls = selected === index ? "selected" : "";
            if (checked && index === current.answer) cls += " correct";
            if (checked && selected === index && index !== current.answer) cls += " wrong";
            return `
              <button class="answer ${cls}" data-answer="${index}">
                <span class="answer-letter">${String.fromCharCode(65 + index)}.</span>
                <span class="answer-text">${escapeHtml(choice)}</span>
              </button>
            `;
          }).join("")}
        </section>
        ${checked ? `<div class="feedback">${escapeHtml(current.explanation)}</div>` : ""}
      </section>
      <nav class="quiz-actions">
        <button class="quiz-nav-button" data-action="prevQuestion">${svg("back")}<span>Prev</span></button>
        <button class="quiz-primary ${checked ? (record.correct ? "correct" : "wrong") : ""}" data-action="check">${checked ? (record.correct ? "Correct" : "Review") : "Check"}</button>
        <button class="quiz-ghost" data-action="showAnswer">Show Answer</button>
        <button class="quiz-nav-button" data-action="nextQuestion"><span>Next</span>${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderResults(questions) {
  const correct = questions.filter((item) => state.answers[item.id]?.correct).length;
  const score = Math.round((correct / questions.length) * 100);
  const missed = questions.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
  const nextLesson = resultNextLessonTarget();
  if (!state.resultSaved) {
    recordQuizResult(questions, correct);
    state.resultSaved = true;
  }
  return `
    <main class="screen">
      ${topbar("Quiz Results")}
      <section class="score-card">
        <p>${correct} of ${questions.length} correct</p>
        <div class="score">${score}%</div>
        <p>${score >= 80 ? "Strong work. Run another fresh set to keep it sharp." : "Keep going. Review missed questions and try a fresh set."}</p>
        ${missed.length ? `<button class="pill-button" data-action="reviewMissed">Review Missed (${missed.length})</button>` : ""}
        ${nextLesson ? `<button class="pill-button" data-action="quizNextLesson">Next Lesson</button>` : ""}
        <button class="pill-button" data-action="restartQuiz">Fresh 10 Questions</button>
        <button class="pill-button secondary" data-action="goHome">Home</button>
      </section>
    </main>
  `;
}

function resultNextLessonTarget() {
  const sourceTopic = state.quizTopic === "daily" ? focusNextTarget().topicId : state.quizTopic;
  if (!sourceTopic) return null;
  if (typeof state.quizSourceLessonIndex === "number") {
    return nextLessonTarget(sourceTopic, state.quizSourceLessonIndex);
  }
  return firstOpenLessonTarget(sourceTopic);
}

function nextLessonTarget(topicId, lessonIndex) {
  const topicIndex = topics.findIndex((topic) => topic.id === topicId);
  if (topicIndex < 0) return null;
  const topic = topics[topicIndex];
  const nextIndex = lessonIndex + 1;
  if (nextIndex < topic.lessons.length) return { topicId, lessonIndex: nextIndex };
  for (let index = topicIndex + 1; index < topics.length; index += 1) {
    if (topics[index].lessons.length) return { topicId: topics[index].id, lessonIndex: 0 };
  }
  return null;
}

function firstOpenLessonTarget(topicId) {
  const topic = topicById(topicId);
  const openIndex = topic.lessons.findIndex((_, index) => !state.complete[`${topicId}:${index}`]);
  if (openIndex >= 0) return { topicId, lessonIndex: openIndex };
  return nextLessonTarget(topicId, topic.lessons.length - 1) || { topicId, lessonIndex: 0 };
}

function openLessonTarget(target) {
  if (!target) return;
  state.screen = "lesson";
  state.topicId = target.topicId;
  state.lessonIndex = target.lessonIndex;
  render();
}

function renderFlashCards() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex] || cards[0];
  const saved = Boolean(state.savedCards[card.id]);
  return `
    <main class="screen flash-screen" data-swipe="flashcards">
      ${topbar("Flash Cards")}
      <button class="return-home-link return-home-top" data-action="goHome">Return Home</button>
      <div class="flash-meta"><span>${state.flashIndex + 1} / ${cards.length}</span><span>${escapeHtml(flashSubjectTitle(state.flashFilterTopic))}</span></div>
      <div class="flash-tools">
        <button class="flash-tool" data-action="chooseFlashSubject">Subject</button>
        <button class="flash-tool ${saved ? "saved" : ""}" data-action="saveFlashCard">${saved ? "Saved" : "Save"}</button>
        <button class="flash-tool" data-action="openFlashTopic">Open Tile</button>
      </div>
      <button class="flash-card ${state.flashFlipped ? "flipped" : ""}" data-action="flipFlashCard">
        <span class="flash-label">${state.flashFlipped ? "Answer" : "Term"}</span>
        <strong>${escapeHtml(state.flashFlipped ? card.definition : card.term)}</strong>
        <small>${state.flashFlipped ? "Tap to see the term" : "Tap to reveal the answer"}</small>
      </button>
      <nav class="bottom-nav flash-bottom-nav">
        <button class="pill-button secondary return-home-bottom" data-action="goHome">Return Home</button>
        <button class="icon-button" data-action="prevFlashCard">${svg("back")}</button>
        <button class="pill-button" data-action="flipFlashCard">Flip</button>
        <button class="icon-button" data-action="nextFlashCard">${svg("next")}</button>
      </nav>
    </main>
  `;
}

function renderFlashSubjectPicker() {
  const subjects = flashSubjects();
  return `
    <main class="screen topic-screen">
      ${topbar("Choose Subject")}
      <section class="list">
        ${subjects.map((subject) => `
          <button class="lesson-row" data-flash-topic="${subject.id}">
            <span class="mini-icon">${subject.id === "all" ? "All" : svg(subject.icon)}</span>
            <strong>${escapeHtml(subject.title)}</strong>
            <span class="subject-count">${subject.count}</span>
          </button>
        `).join("")}
      </section>
    </main>
  `;
}

function renderSearch() {
  return `
    <main class="screen topic-screen">
      ${topbar("Search")}
      <section class="search-panel">
        <input id="searchBox" class="search-input" type="search" value="${escapeHtml(state.searchQuery)}" placeholder="Search variables, loops, RAPTOR..." autocomplete="off">
        <div class="search-results">${renderSearchResults(state.searchQuery)}</div>
      </section>
    </main>
  `;
}

function renderSearchResults(query) {
  const results = searchItems(query);
  if (!query.trim()) return `<p class="empty-note">Search lessons and flash cards by term, symbol, or problem pattern.</p>`;
  if (!results.length) return `<p class="empty-note">No matches yet. Try a shorter term.</p>`;
  return results.map((item) => {
    if (item.kind === "lesson") {
      return `
        <button class="search-row" data-search-topic="${item.topic.id}" data-search-lesson="${item.lessonIndex}">
          <span>Lesson</span><strong>${escapeHtml(item.lesson.title)}</strong><small>${escapeHtml(item.topic.title)}</small>
        </button>
      `;
    }
    return `
      <button class="search-row" data-search-card="${item.card.id}">
        <span>Flash Card</span><strong>${escapeHtml(item.card.term)}</strong><small>${escapeHtml(topicById(item.card.topic).title)}</small>
      </button>
    `;
  }).join("");
}

function quizTitle() {
  if (state.quizTopic === "daily") return "Fresh 10 Drill";
  const topic = topicById(state.quizTopic);
  return `${topic.title} Quiz`;
}

function dots(total, active) {
  return `<div class="progress-strip">${Array.from({ length: total }, (_, index) => `<span class="progress-dot ${index === active ? "active" : ""}"></span>`).join("")}</div>`;
}

function startQuiz(topicId, options = {}) {
  state.screen = "quiz";
  state.quizTopic = topicId;
  state.quizSourceLessonIndex = typeof options.lessonIndex === "number" ? options.lessonIndex : null;
  state.quizIndex = 0;
  state.selected = null;
  state.answers = {};
  state.resultSaved = false;
  const source = options.questions || pickQuizSource(topicId, state.quizSourceLessonIndex);
  state.activeQuestions = source.map(randomizeQuestion);
  render();
}

function pickQuizSource(topicId, lessonIndex = null) {
  if (topicId === "daily") return shuffle(fullQuestionBank).slice(0, 10);
  const lessonQuestions = typeof lessonIndex === "number"
    ? fullQuestionBank.filter((item) => item.topic === topicId && item.lessonIndex === lessonIndex)
    : [];
  const topicQuestions = fullQuestionBank.filter((item) => item.topic === topicId && !lessonQuestions.some((qItem) => qItem.id === item.id));
  const combined = [...shuffle(lessonQuestions), ...shuffle(topicQuestions)];
  const seen = new Set();
  const picked = [];
  combined.forEach((item) => {
    if (!seen.has(item.id) && picked.length < 10) {
      picked.push(item);
      seen.add(item.id);
    }
  });
  if (picked.length < 10) {
    shuffle(fullQuestionBank).forEach((item) => {
      if (!seen.has(item.id) && picked.length < 10) {
        picked.push(item);
        seen.add(item.id);
      }
    });
  }
  return shuffle(picked).slice(0, 10);
}

function randomizeQuestion(item) {
  const choices = item.choices.map((text, index) => ({ text, correct: index === item.answer }));
  const shuffled = shuffle(choices);
  return {
    ...item,
    id: `${item.id}-${Math.random().toString(36).slice(2)}`,
    choices: shuffled.map((choice) => choice.text),
    answer: shuffled.findIndex((choice) => choice.correct)
  };
}

function recordQuizResult(questions, correct) {
  const score = Math.round((correct / questions.length) * 100);
  const best = Math.max(load(STORAGE.bestQuiz, 0), score);
  save(STORAGE.bestQuiz, best);
  const stats = load(STORAGE.stats, {});
  questions.forEach((question) => {
    if (!stats[question.topic]) stats[question.topic] = { correct: 0, total: 0, attempts: 0 };
    stats[question.topic].total += 1;
    stats[question.topic].attempts += 1;
    if (state.answers[question.id]?.correct) stats[question.topic].correct += 1;
  });
  if (state.quizTopic) {
    if (!stats[state.quizTopic]) stats[state.quizTopic] = { correct: 0, total: 0, attempts: 0 };
    stats[state.quizTopic].attempts += 1;
  }
  save(STORAGE.stats, stats);
}

function checkAnswer() {
  const current = currentQuestion();
  if (!current || state.answers[current.id] || state.selected === null) return;
  state.answers[current.id] = {
    selected: state.selected,
    correct: state.selected === current.answer
  };
  render();
}

function showAnswer() {
  const current = currentQuestion();
  if (!current || state.answers[current.id]) return;
  state.answers[current.id] = { selected: current.answer, correct: true };
  state.selected = current.answer;
  render();
}

function currentQuestion() {
  return state.activeQuestions[state.quizIndex];
}

function moveQuestion(direction) {
  const next = state.quizIndex + direction;
  state.selected = null;
  if (next < 0) return;
  if (next >= state.activeQuestions.length) {
    state.quizIndex = state.activeQuestions.length;
  } else {
    state.quizIndex = next;
  }
  render();
}

function moveLesson(direction) {
  const topic = topicById(state.topicId);
  const next = state.lessonIndex + direction;
  if (next >= 0 && next < topic.lessons.length) {
    state.lessonIndex = next;
  } else if (next >= topic.lessons.length) {
    state.screen = "topic";
  }
  render();
}

function markDone() {
  state.complete[`${state.topicId}:${state.lessonIndex}`] = true;
  save(STORAGE.complete, state.complete);
}

function back() {
  if (state.screen === "home") return;
  if (state.screen === "lesson" || state.screen === "quiz") state.screen = "topic";
  else if (state.screen === "topic" || state.screen === "flashcards" || state.screen === "search" || state.screen === "flashSubjects") state.screen = "home";
  render();
}

function toggleBookmark() {
  if (state.screen !== "lesson") return;
  const key = `${state.topicId}:${state.lessonIndex}`;
  if (state.bookmarks[key]) delete state.bookmarks[key];
  else state.bookmarks[key] = true;
  save(STORAGE.bookmarks, state.bookmarks);
  render();
}

function startFlashCards(topicId = "all") {
  const cards = topicId === "saved"
    ? flashCardBank.filter((card) => state.savedCards[card.id])
    : topicId === "all" ? flashCardBank : flashCardBank.filter((card) => card.topic === topicId);
  state.screen = "flashcards";
  state.flashCards = shuffle(cards.length ? cards : flashCardBank);
  state.flashIndex = 0;
  state.flashFlipped = false;
  state.flashFilterTopic = topicId;
  render();
}

function flashSubjects() {
  const subjects = [{ id: "all", title: "All Flash Cards", icon: "cards", count: flashCardBank.length }];
  const savedCount = flashCardBank.filter((card) => state.savedCards[card.id]).length;
  if (savedCount) subjects.push({ id: "saved", title: "Saved Flash Cards", icon: "star", count: savedCount });
  topics.forEach((topic) => {
    const count = flashCardBank.filter((card) => card.topic === topic.id).length;
    if (count) subjects.push({ id: topic.id, title: topic.title, icon: topic.icon, count });
  });
  return subjects;
}

function flashSubjectTitle(topicId) {
  if (topicId === "all") return "All subjects";
  if (topicId === "saved") return "Saved cards";
  return topicById(topicId).title;
}

function moveFlashCard(direction) {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  state.flashIndex = (state.flashIndex + direction + cards.length) % cards.length;
  state.flashFlipped = false;
  render();
}

function toggleSaveFlashCard() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex];
  if (!card) return;
  if (state.savedCards[card.id]) delete state.savedCards[card.id];
  else state.savedCards[card.id] = true;
  save(STORAGE.savedCards, state.savedCards);
  render();
}

function openFlashTopic() {
  const cards = state.flashCards.length ? state.flashCards : flashCardBank;
  const card = cards[state.flashIndex];
  if (!card) return;
  state.screen = "topic";
  state.topicId = card.topic;
  render();
}

function searchItems(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const results = [];
  topics.forEach((topic) => {
    topic.lessons.forEach((lesson, lessonIndex) => {
      const haystack = [
        topic.title,
        lesson.title,
        ...(lesson.body || []),
        lesson.remember || "",
        ...(lesson.sections || []).flatMap((section) => [section.title, ...(section.items || [])])
      ].join(" ").toLowerCase();
      if (haystack.includes(needle)) results.push({ kind: "lesson", topic, lesson, lessonIndex });
    });
  });
  flashCardBank.forEach((card) => {
    const haystack = `${card.term} ${card.definition} ${topicById(card.topic).title}`.toLowerCase();
    if (haystack.includes(needle)) results.push({ kind: "flash", card });
  });
  return results.slice(0, 30);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function animateStats() {
  setTimeout(() => {
    document.querySelectorAll(".stat-ring").forEach((ring) => {
      const value = ring.style.getPropertyValue("--value") || "0%";
      const color = ring.classList.contains("readiness-build") ? "var(--green)" : "var(--accent)";
      ring.style.background = `conic-gradient(${color} ${value}, rgba(255,255,255,0.08) 0)`;
    });
  }, 80);
}

function addSwipe(element) {
  element.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  element.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const delta = touchEndX - touchStartX;
    if (Math.abs(delta) < 70) return;
    if (element.dataset.swipe === "lesson") moveLesson(delta < 0 ? 1 : -1);
    if (element.dataset.swipe === "quiz") moveQuestion(delta < 0 ? 1 : -1);
    if (element.dataset.swipe === "flashcards") moveFlashCard(delta < 0 ? 1 : -1);
  }, { passive: true });
}

function wire() {
  document.querySelectorAll("[data-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "topic";
      state.topicId = button.dataset.topic;
      state.lessonIndex = 0;
      render();
    });
  });
  document.querySelectorAll("[data-lesson]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.lessonIndex = Number(button.dataset.lesson);
      render();
    });
  });
  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const current = currentQuestion();
      if (!current || state.answers[current.id]) return;
      state.selected = Number(button.dataset.answer);
      render();
    });
  });
  document.querySelectorAll("[data-bookmark-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.bookmarkTopic;
      state.lessonIndex = Number(button.dataset.bookmarkLesson);
      render();
    });
  });
  document.querySelectorAll("[data-flash-topic]").forEach((button) => {
    button.addEventListener("click", () => startFlashCards(button.dataset.flashTopic));
  });
  document.querySelectorAll("[data-focus-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.topicId = button.dataset.focusTopic;
      const lessonIndex = Number(button.dataset.focusLesson);
      if (Number.isInteger(lessonIndex) && lessonIndex >= 0) {
        state.screen = "lesson";
        state.lessonIndex = lessonIndex;
      } else {
        state.screen = "topic";
        state.lessonIndex = 0;
      }
      render();
    });
  });
  document.querySelectorAll("[data-search-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      state.screen = "lesson";
      state.topicId = button.dataset.searchTopic;
      state.lessonIndex = Number(button.dataset.searchLesson);
      render();
    });
  });
  document.querySelectorAll("[data-search-card]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = flashCardBank.find((item) => item.id === button.dataset.searchCard);
      if (!card) return;
      state.screen = "flashcards";
      state.flashCards = [card];
      state.flashIndex = 0;
      state.flashFlipped = false;
      state.flashFilterTopic = card.topic;
      render();
    });
  });
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => act(button.dataset.action));
  });
  document.querySelectorAll("[data-swipe]").forEach(addSwipe);
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    searchBox.addEventListener("input", () => {
      state.searchQuery = searchBox.value;
      const results = document.querySelector(".search-results");
      if (results) results.innerHTML = renderSearchResults(state.searchQuery);
      wire();
    });
  }
}

function act(action) {
  if (action === "back") return back();
  if (action === "info") return alert("Swipe left or right on lesson, quiz, and flash card screens. Progress is stored only on this device.");
  if (action === "star") return toggleBookmark();
  if (action === "startDailyDrill") return startQuiz("daily");
  if (action === "startFlashCards") return startFlashCards();
  if (action === "openSearch") {
    state.screen = "search";
    state.searchQuery = "";
    return render();
  }
  if (action === "topicQuiz") return startQuiz(state.topicId);
  if (action === "lessonQuiz") return startQuiz(state.topicId, { lessonIndex: state.lessonIndex });
  if (action === "prevLesson") return moveLesson(-1);
  if (action === "nextLesson") return moveLesson(1);
  if (action === "markDone") {
    markDone();
    return moveLesson(1);
  }
  if (action === "check") return checkAnswer();
  if (action === "showAnswer") return showAnswer();
  if (action === "prevQuestion") return moveQuestion(-1);
  if (action === "nextQuestion") return moveQuestion(1);
  if (action === "reviewMissed") {
    const missed = state.activeQuestions.filter((item) => state.answers[item.id] && !state.answers[item.id].correct);
    return startQuiz(state.quizTopic || "daily", { questions: missed.length ? missed : pickQuizSource(state.quizTopic || "daily") });
  }
  if (action === "quizNextLesson") return openLessonTarget(resultNextLessonTarget());
  if (action === "restartQuiz") return startQuiz(state.quizTopic || "daily", { lessonIndex: state.quizSourceLessonIndex });
  if (action === "goHome") {
    state.screen = "home";
    return render();
  }
  if (action === "chooseFlashSubject") {
    state.screen = "flashSubjects";
    return render();
  }
  if (action === "flipFlashCard") {
    state.flashFlipped = !state.flashFlipped;
    return render();
  }
  if (action === "saveFlashCard") return toggleSaveFlashCard();
  if (action === "shuffleFlashCards") return startFlashCards(state.flashFilterTopic);
  if (action === "prevFlashCard") return moveFlashCard(-1);
  if (action === "nextFlashCard") return moveFlashCard(1);
  if (action === "openFlashTopic") return openFlashTopic();
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}

render();
