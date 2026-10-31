resource "kubernetes_deployment_v1" "kafka" {
  metadata {
    name      = "kafka"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }


  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "kafka"
      }
    }

    template {
      metadata {
        labels = {
          app = "kafka"
        }
      }

      spec {
        container {
          name  = "kafka"
          image = "apache/kafka:latest"

          port {
            container_port = 9093
          }

          env {
            name  = "KAFKA_NODE_ID"
            value = "1"
          }

          env {
            name  = "KAFKA_PROCESS_ROLES"
            value = "broker,controller"
          }
          env {
            name  = "KAFKA_LISTENERS"
            value = "CONTROLLER://:9091,DOCKER://:9093"
          }

          env {
            name  = "KAFKA_ADVERTISED_LISTENERS"
            value = "DOCKER://kafka:9093"
          }

          env {
            name  = "KAFKA_LISTENER_SECURITY_PROTOCOL_MAP"
            value = "CONTROLLER:PLAINTEXT,DOCKER:PLAINTEXT"
          }

          env {
            name  = "KAFKA_CONTROLLER_LISTENER_NAMES"
            value = "CONTROLLER"
          }

          env {
            name  = "KAFKA_CONTROLLER_QUORUM_VOTERS"
            value = "1@localhost:9091"
          }

          env {
            name  = "KAFKA_INTER_BROKER_LISTENER_NAME"
            value = "DOCKER"
          }

          env {
            name  = "KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR"
            value = "1"
          }
        }
      }
    }
  }
}



resource "kubernetes_service_v1" "kafka" {
  metadata {
    name      = "kafka"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  spec {
    selector = {
      app = "kafka"
    }

    port {
      name        = "broker"
      port        = 9093
      target_port = 9093
    }
  }
}