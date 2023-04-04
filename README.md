# Prepare

## Generate 13000 redirect entries

```sh
python -c 'import uuid; length = 13000; ids1 = [str(uuid.uuid4()) for i in range(1, length+1)]; ids2 = [str(uuid.uuid4()) for i in range(1, length+1)]; out = [f"Redirect permanent \"/{id1}\" \"/{id2}\"" for id1, id2 in zip(ids1, ids2)]; print("\n".join(out))' > .htaccess
```

# Run httpd

## In Case: Run httpd with .htaccess

```sh
# in .htaccess
docker run --rm -v $(pwd)/httpd.conf.htaccess:/usr/local/apache2/conf/httpd.conf -v $(pwd)/.htaccess:/usr/local/apache2/htdocs/.htaccess -p 8080:80 --name testhttpd httpd:2.4
```

## In Case: Run httpd (in daemon)

```sh
# in daemon setting
docker run --rm -v $(pwd)/httpd.conf.daemon:/usr/local/apache2/conf/httpd.conf -v $(pwd)/.htaccess:/usr/local/apache2/conf/dot.htaccess -p 8080:80 --name testhttpd httpd:2.4
```

# Run

```sh
k6 run --vus 10 --duration 30s run.js
```

# Remarks

## Get original httpd.conf from container

```sh
docker run --rm httpd:2.4 cat /usr/local/apache2/conf/httpd.conf > httpd.conf.orig
```
