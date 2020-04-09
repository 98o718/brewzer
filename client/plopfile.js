module.exports = (plop) => {
  plop.setGenerator('c', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.tsx.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path:
          'src/components/{{pascalCase name}}/{{pascalCase name}}.styles.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Component.styles.ts.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/{{pascalCase name}}/index.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/index.ts.hbs',
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/components/index.ts',
        pattern: '/*APPEND COMPONENT IMPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendComponentImport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/components/index.ts',
        pattern: '/*APPEND COMPONENT EXPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendComponentExport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/components/index.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/indexComponents.ts.hbs',
      },
    ],
  })

  plop.setGenerator('h', {
    description: 'Create a hook',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your hook name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/hooks/use{{pascalCase name}}.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Hook.ts.hbs',
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/hooks/index.ts',
        pattern: '/*APPEND HOOK EXPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendHookExport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/hooks/index.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/indexHooks.ts.hbs',
      },
    ],
  })

  plop.setGenerator('p', {
    description: 'Create a page',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your page name?',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Page.tsx.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path:
          'src/pages/{{pascalCase name}}Page/{{pascalCase name}}Page.styles.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/Page.styles.ts.hbs',
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/pages/{{pascalCase name}}Page/index.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/indexPages.ts.hbs',
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/pages/index.ts',
        pattern: '/*APPEND PAGE IMPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendPageImport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'append',
        // Path for the new file
        path: 'src/pages/index.ts',
        pattern: '/*APPEND PAGE EXPORT HERE*/',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/appendPageExport.hbs',
        abortOnFail: false,
      },
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: 'src/pages/index.ts',
        // Handlebars template used to generate content of new file
        templateFile: 'plop-templates/indexPage.ts.hbs',
      },
    ],
  })
}
