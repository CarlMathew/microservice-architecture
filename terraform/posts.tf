resource "kubernetes_deployment_v1" "posts" {

  metadata {
    name      = "posts"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "posts"
      }
    }

    template {
      metadata {
        labels = {
          app = "posts"
        }
      }

      spec {
        container {
          name  = "posts"
          image = "carlito027/posts:latest"

          image_pull_policy = "Always"

          port {
            container_port = 3000
          }

          env {
            name  = "PORT"
            value = "3000"
          }

          env {
            name  = "DATABASE_URL"
            value = "postgresql://postgres:postgres@postgres:5432/posts"
          }

          env {
            name  = "KAFKA_BROKER"
            value = "kafka:9093"
          }

          env {
            name  = "REDIS_URL"
            value = "redis://redis:6379"
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "posts" {

  metadata {
    name      = "posts"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  spec {
    selector = {
      app = "posts"
    }

    port {
      port        = 3000
      target_port = 3000
      node_port   = 30080
    }

    type = "NodePort"
  }

}
