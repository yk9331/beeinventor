## Distributed Dictionary System Design

### Basic Requirements
* User can upload texts or books
* User can view the texts or books
* User should be able to search texts or books


### Solution

![](./diagram.png)

**Backend Architecture with AWS**
* Entry point for client
    * API Gateway

* Scalable Microservices
    * Load Balencer
    * ECS (or EKS)
    * SQS
    * Lambda

* Main Database
    * RDS (or Aurora)

* Full-text Search Engine
    * Elastic Search

* File Storage
    * S3 private bucket

* Cache
    * Cloud Front
    * Elastic Cache

**User upload flow**
1. The client sends GET /pre-signed-url request and uploads original files.
2. The client sends POST /texts or POST /books request.
3. Upload service validate metadata and uploaded files.
4. Upload service store metadata to DB and enqueue for content parser.
5. Content parser get files from S3 and metadata from DB then stores texts to Elastic Search.

**User view flow**
1. The client sends GET /texts, GET /books  or GET /texts/<:id>, GET /books/<:id> request.
2. View & Search service check if metadata cache exist 
    * exist: Get metadata from cache
    * not exist: Get metadata from DB then store to cache
3. Generate pre-signed url to accsee files (cached by CDN) and return result to client

**User search flow**
1. The client sends GET /search?q=word request.
2. View & Search service check if search cache exist
    * exist: get search result from cache
    * not exist: search contents from Elastic Search and get metadata from DB then store result to cache.
3. Return search result to client.