console.log("Hello, World!")

type User = {
  username: string;
  role: string;
  active: boolean;
};

const users: User[] = [
  {
    username: 'john',
    role: 'admin',
    active: true
  },
  {
    username: 'mary',
    role: 'user',
    active: false
  },
  {
    username: 'peter',
    role: 'user',
    active: true
  }
];

async function getUsername(): Promise<string> {
  return 'John';
}

const activeUsers = users.filter(user => user.active);
const usernames = users.map(user => user.username);
const admin = users.find(user => user.role === 'admin');
const hasNotActiveUser = users.some(user => !user.active);
const allActive = users.every(user => user.active);

console.log("Active Users:", activeUsers);
console.log("Usernames:", usernames);
if(admin) {
  console.log("Admin User:", admin);
}
console.log("Has Not Active User:", hasNotActiveUser);
console.log("All Active Users:", allActive);

(async () => {
  const username = await getUsername();
  console.log("Fetched Username:", username);
})();

export { };
