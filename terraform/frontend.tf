resource "kubernetes_deployment_v1" "frontend" {
  metadata {
    name      = "frontend"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  spec {
    replicas = 1
    selector {
      match_labels = {
        app = "frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "frontend"
        }
      }

      spec {
        container {
          name  = "frontend"
          image = "carlito027/frontend:latest"

          image_pull_policy = "Always"

          port {
            container_port = 5173
          }
        }
      }
    }
  }
}



resource "kubernetes_service_v1" "frontend" {

  metadata {
    name      = "frontend"
    namespace = kubernetes_namespace_v1.microservices.metadata[0].name
  }

  spec {
    selector = {
      app = "frontend"
    }

    port {
      port        = 5173
      target_port = 5173
      node_port   = 30082
    }

    type = "NodePort"
  }

}
