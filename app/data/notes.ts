export type Category = 'git' | 'vscode' | 'claude' | 'netlify' | 'supabase' | 'other';

export type Note = {
  id: number;
  cat: Category;
  fav: boolean;
  title: string;
  code: string;
  desc: string;
  tags: string[];
  date?: string;
};

export const CAT_META: Record<Category, { name: string; color: string; tint: string; border: string }> = {
  git:      { name: 'Git',      color: 'rgb(217,45,32)',  tint: 'rgb(254,243,242)', border: 'rgba(217,45,32,0.30)' },
  vscode:   { name: 'VS Code',  color: 'rgb(37,99,235)',  tint: 'rgb(239,246,255)', border: 'rgba(37,99,235,0.30)' },
  claude:   { name: 'Claude',   color: 'rgb(217,119,87)', tint: 'rgb(250,240,235)', border: 'rgba(217,119,87,0.32)' },
  netlify:  { name: 'Netlify',  color: 'rgb(22,163,74)',  tint: 'rgb(236,253,243)', border: 'rgba(22,163,74,0.30)' },
  supabase: { name: 'Supabase', color: 'rgb(127,86,217)', tint: 'rgb(249,245,255)', border: 'rgba(127,86,217,0.30)' },
  other:    { name: 'Other',    color: 'rgb(82,82,82)',   tint: 'rgb(245,245,245)', border: 'rgba(82,82,82,0.30)' },
};

export const CAT_ORDER: Category[] = ['git', 'vscode', 'claude', 'netlify', 'supabase', 'other'];

export const SEED_NOTES: Note[] = [
  { id:1,  cat:'git',      fav:true,  title:'Keep main branch up to date before branching', code:'git pull origin main',                     desc:'To avoid overwriting changes on the live branch, make sure your local main is up to date before creating or updating your working branch.', tags:['branching','workflow','main'], date:'Jun 17' },
  { id:2,  cat:'git',      fav:true,  title:'Switch to a branch',                            code:'git checkout dev-AnhTuan',                 desc:'Switches you to the dev-AnhTuan branch. Use this whenever you want to go back to your working branch.',                                     tags:['branching','command'],         date:'Jun 17' },
  { id:3,  cat:'git',      fav:true,  title:'Push to remote',                                code:'git push origin dev-AnhTuan',              desc:'Uploads your local commits to GitHub. Replace dev-AnhTuan with your branch name.',                                                         tags:['remote','command'],            date:'Jun 17' },
  { id:4,  cat:'git',      fav:true,  title:'Stage all changes',                             code:'git add .',                                desc:'Stages every changed and new file in the current directory. Be careful not to accidentally include .env files.',                             tags:['staging','command'],           date:'Jun 17' },
  { id:5,  cat:'git',      fav:false, title:'Check repo status',                             code:'git status',                               desc:'Shows which files are staged, unstaged, or untracked. Run this before every commit.',                                                       tags:['command','workflow'],          date:'Jun 17' },
  { id:6,  cat:'git',      fav:false, title:'Commit with message',                           code:'git commit -m "your message here"',        desc:'Saves staged changes to local history. Write the message in present tense, e.g. "add login page".',                                        tags:['commit','command'],            date:'Jun 17' },
  { id:7,  cat:'git',      fav:false, title:'Merge a branch into main',                      code:'git merge dev-AnhTuan',                    desc:'Combines the dev-AnhTuan branch into your current branch. Resolve any conflicts before committing the merge.',                              tags:['merge','command'],             date:'Jun 17' },
  { id:8,  cat:'vscode',   fav:false, title:'Open Command Palette',                          code:'Cmd + Shift + P',                          desc:'The most important shortcut. Search for any VS Code action here — open files, run commands, change settings.',                              tags:['shortcut','essential'],        date:'Jun 17' },
  { id:9,  cat:'vscode',   fav:false, title:'Toggle integrated terminal',                    code:'Ctrl + ` (backtick)',                      desc:'Opens and closes the built-in terminal without leaving VS Code.',                                                                          tags:['shortcut','terminal'],         date:'Jun 17' },
  { id:10, cat:'vscode',   fav:false, title:'Search across all files',                       code:'Cmd + Shift + F',                          desc:'Opens the global search panel. You can filter by file type or folder.',                                                                    tags:['shortcut','search'],           date:'Jun 17' },
  { id:11, cat:'vscode',   fav:false, title:'Quick open file',                               code:'Cmd + P',                                  desc:'Jump to any file by name without touching the file tree. Type @ to jump to a symbol.',                                                    tags:['shortcut','navigation'],       date:'Jun 17' },
  { id:12, cat:'vscode',   fav:false, title:'Multi-cursor edit',                             code:'Cmd + D',                                  desc:'Selects the next occurrence of the current word so you can edit them all at once.',                                                        tags:['shortcut','editing'],          date:'Jun 17' },
  { id:13, cat:'netlify',  fav:false, title:'Deploy to production',                          code:'netlify deploy --prod',                    desc:'Builds and ships the current site to your live production URL. Drop --prod for a preview deploy.',                                         tags:['deploy','cli'],                date:'Jun 17' },
  { id:14, cat:'netlify',  fav:false, title:'Link a local project to a site',                code:'netlify link',                             desc:'Connects your local folder to an existing Netlify site so deploys go to the right place.',                                                  tags:['cli','setup'],                 date:'Jun 17' },
  { id:15, cat:'netlify',  fav:false, title:'Run local dev server',                          code:'netlify dev',                              desc:'Runs your site locally with Netlify functions, redirects and env vars working just like production.',                                      tags:['cli','local'],                 date:'Jun 17' },
  { id:16, cat:'supabase', fav:false, title:'Start the local stack',                         code:'supabase start',                           desc:'Spins up a local Postgres, Auth and Storage stack in Docker for offline development.',                                                     tags:['cli','local'],                 date:'Jun 17' },
  { id:17, cat:'supabase', fav:false, title:'Push database migrations',                      code:'supabase db push',                         desc:'Applies your local migration files to the linked remote database.',                                                                       tags:['database','migration'],        date:'Jun 17' },
  { id:18, cat:'supabase', fav:false, title:'Generate TypeScript types',                     code:'supabase gen types typescript',            desc:'Creates fully-typed definitions from your schema so queries are type-safe.',                                                              tags:['types','database'],            date:'Jun 17' },
  { id:21, cat:'claude',   fav:true,  title:'Start Claude Code in your project',             code:'claude',                                   desc:'Launches an interactive session in the current directory. Claude can read, edit, and run code in your repo — every change waits for your approval.', tags:['cli','essential'], date:'Jun 17' },
  { id:22, cat:'claude',   fav:true,  title:'Set up project memory',                         code:'/init',                                    desc:'Generates a CLAUDE.md file so Claude remembers your conventions, scripts, and architecture across every future session.',                   tags:['memory','setup'],              date:'Jun 17' },
  { id:23, cat:'claude',   fav:false, title:'Continue your last session',                    code:'claude --continue',                        desc:'Resumes the most recent conversation in this folder with full context restored. Use the -c shorthand to save keystrokes.',                 tags:['session','cli'],               date:'Jun 17' },
  { id:24, cat:'claude',   fav:false, title:'Run a one-off prompt (headless)',                code:'claude -p "summarize the recent changes"', desc:'Print mode runs a single prompt non-interactively and exits — perfect for scripts, git hooks, and CI pipelines.',                        tags:['automation','cli'],            date:'Jun 17' },
  { id:25, cat:'claude',   fav:false, title:'Reset the context window',                      code:'/clear',                                   desc:'Wipes the current conversation context to start fresh without leaving the session.',                                                      tags:['context','session'],           date:'Jun 17' },
  { id:26, cat:'claude',   fav:false, title:'Connect external tools (MCP)',                  code:'claude mcp add',                           desc:'Wires up Model Context Protocol servers — GitHub, databases, browsers, Figma — so Claude can act on your real tools, not just your code.', tags:['mcp','tools'],                 date:'Jun 17' },
  { id:19, cat:'other',    fav:false, title:'Pretty-print JSON in terminal',                 code:'cat data.json | jq',                       desc:'Pipes a JSON file through jq for readable, colorized output. Add a filter like .items[] to drill in.',                                  tags:['terminal','json'],             date:'Jun 17' },
  { id:20, cat:'other',    fav:false, title:'Kill the process on a port',                    code:'lsof -ti:3000 | xargs kill',               desc:'Frees up port 3000 when a dev server refuses to quit. Swap in any port number.',                                                          tags:['terminal','unix'],             date:'Jun 17' },
];
