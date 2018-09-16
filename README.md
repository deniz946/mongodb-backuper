# mongodb-backuper

### usage

![Gif Usage](https://i.gyazo.com/2bf649cf144a263594a95493aa6af99d.gif)

### steps
* Create a folder called backups and inside clone this repo
* go to the script folder `cd mongo-backup-script`
* run `npm run backup` and select you database to backup


### folder structure 
```
backups   
└───db1Folder -> this folder will be created automatically if no prior backup
│   │   db1-04-09-2018
│   │   db1-05-09-2018
│   
└───db2Folder -> this folder will be created automatically if no prior backup
│   │   db2-16-09-2018
│   │   db2-17-09-2018
│   
└───mongo-backup-script -> backup script folder
    │   backup.js
    │   package.json
```

