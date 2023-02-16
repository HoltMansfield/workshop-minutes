- When I send someone to create statuses or steps I have to know that once there and 
  show them a way back

- Sniff out usages of fontSize and swap in Typography

-https://github.com/mobilusoss/react-web-notification/blob/develop/example/app.js

-track previous timers for repeated steps ie: glue-ups

-might be able to update individual steps on project
      query: {
        _id: { $oid: selectedProject._id  },
        steps: { $elemMatch: { name: step.name } }
      },
