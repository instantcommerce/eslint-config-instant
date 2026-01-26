module.exports = {
	// add additional standard scopes here
	scopes: [{ name: 'events' }, { name: 'user' }, { name: 'tickets' }],
	// use this to permanently skip any questions by listing the message key as a string
	skipQuestions: [],

	/* DEFAULT CONFIG */
	messages: {
		type: 'What type of changes are you committing:',
		scope: '\nEnlighten us with the scope (optional):',
		customScope: 'Add the scope of your liking:',
		subject: 'Write a short and simple description of the change:\n',
		body: 'Provide a LONGER description of the change (optional). Use "|" to break new line:\n',
		breaking: 'List any BREAKING CHANGES (optional):\n',
		footer: 'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
		confirmCommit: 'Are you sure you the above looks right?',
	},
	types: [
		{
			value: 'fix',
			name: '🐛   fix:        Changes that fix a bug',
			emoji: '🐛',
		},
		{
			value: 'feat',
			name: ' 🚀  feat:       Changes that introduce a new feature',
			emoji: '🚀',
		},
		{
			value: 'refactor',
			name: '🔍   refactor:   Changes that neither fixes a bug nor adds a feature',
			emoji: '🔍',
		},
		{
			value: 'test',
			name: '💡   test:       Adding missing tests',
			emoji: '💡',
		},
		{
			value: 'style',
			name: '💅   style:      Changes that do not impact the code base  \n                   (white-space, formatting, missing semi-colons, etc)',
			emoji: '💅',
		},
		{
			value: 'docs',
			name: '📝   docs:       Changes to the docs',
			emoji: '📝',
		},
		{
			value: 'chore',
			name: '🤖   chore:      Changes to the build process or auxiliary tools\n                   and or libraries such as auto doc generation',
			emoji: '🤖',
		},
	],
	allowTicketNumber: false,
	isTicketNumberRequired: false,
	ticketNumberPrefix: '#',
	ticketNumberRegExp: '\\d{1,5}',
	allowCustomScopes: true,
	allowBreakingChanges: ['feat', 'fix', 'chore'],
	breakingPrefix: '🚧 BREAKING CHANGES 🚧',
	footerPrefix: 'CLOSES ISSUE:',
	subjectLimit: 100,
};
