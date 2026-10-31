resource "kubernetes_config_map_v1" "postgres-init" {
  metadata {
    name      = "postgres-init"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  data = {
    "init.sql" = <<-EOT
    CREATE DATABASE posts;
    CREATE DATABASE comments;
    EOT
  }
}

resource "kubernetes_persistent_volume_claim_v1" "postgres" {
  metadata {
    name      = "postgres-data"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  spec {
    access_modes = ["ReadWriteOnce"]

    resources {
      requests = {
        storage = "1Gi"
      }
    }
  }
}


resource "kubernetes_deployment_v1" "postgres" {
  metadata {
    name      = "postgres"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "postgres"
      }
    }

    template {

      metadata {
        labels = {
          app = "postgres"
        }
      }

      spec {
        container {
          name  = "postgres"
          image = "postgres:17-alpine"

          port {
            container_port = 5432
          }

          env {
            name  = "POSTGRES_USER"
            value = "postgres"
          }

          env {
            name  = "POSTGRES_PASSWORD"
            value = "postgres"
          }

          env {
            name  = "POSTGRES_DB"
            value = "app"
          }

          volume_mount {
            name       = "postgres-data"
            mount_path = "/var/lib/postgresql/data"
          }

          volume_mount {
            name       = "postgres-init"
            mount_path = "/docker-entrypoint-initdb.d"
          }

        }

        volume {
          name = "postgres-data"

          persistent_volume_claim {
            claim_name = kubernetes_persistent_volume_claim_v1.postgres.metadata[0].name
          }
        }

        volume {
          name = "postgres-init"
          config_map {
            name = kubernetes_config_map_v1.postgres-init.metadata[0].name
          }
        }
      }
    }

  }
}

resource "kubernetes_service_v1" "postgres" {
  metadata {
    name      = "postgres"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  spec {
    selector = {
      app = "postgres"
    }

    port {
      port        = 5432
      target_port = 5432
    }
  }

}