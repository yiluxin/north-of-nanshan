Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    let zhanjunyuId = Accounts.createUser({ username: 'zhanjunyu', password: 'babyblue' });
    let yiluxinId = Accounts.createUser({ username: 'yiluxin', password: 'babyblue' });
    let ningchangyuId = Accounts.createUser({ username: 'ningchangyu', password: 'babyblue' });

    for (let i = 0; i < 90; i++) {
      let authorId;
      let now = new Date().getTime();
      switch(i % 3) {
        case 0:
          authorId = zhanjunyuId;
          break;
        case 1:
          authorId = yiluxinId;
          break;
        case 2:
          authorId = ningchangyuId;
          break;
      }
      Posts.insert({
        authorId: authorId,
        title: `Post #${i}`,
        content: `This is post number ${i}!`,
        createdAt: new Date(now + i)
      });
    }
  }
});
