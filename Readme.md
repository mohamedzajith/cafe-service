#### Docker build
```sudo docker build -t <username>/cafe-service .```

#### Docker run with port
```sudo docker run -p 5000:5000 <username>/cafe-service```

#### Docker install and set-up dbs
```https://www.bmc.com/blogs/mongodb-docker-container/```

```
sudo docker exec -it mongodb bash
mongosh
```
```
show databases;
use cafe;
db.createUser(
  {
    user: "myCafeAdmin",
    pwd: "cafe2023*!",
    roles: [ { role: "readWrite", db: "cafe" } ]
  }
)
```
