// Portfolio Modal System
const serviceData = {
    aws: {
        title: "AWS Cloud Services",
        subtitle: "Scalable cloud infrastructure solutions",
        description: "Comprehensive AWS cloud services including EC2, S3, RDS, Lambda, and more. We help you build, deploy, and manage applications on Amazon Web Services with best practices for security, scalability, and cost optimization.",
        features: [
            "EC2 instance management and auto-scaling",
            "S3 storage solutions and data management",
            "RDS database setup and optimization",
            "Lambda serverless functions",
            "CloudFormation infrastructure as code"
        ]
    },
    terraform: {
        title: "Terraform Infrastructure as Code",
        subtitle: "Automated infrastructure provisioning",
        description: "Infrastructure as Code using Terraform to provision and manage cloud resources across multiple providers. Ensure consistent, repeatable, and version-controlled infrastructure deployments.",
        features: [
            "Multi-cloud infrastructure provisioning",
            "State management and remote backends",
            "Module development and reusability",
            "Infrastructure versioning and rollbacks",
            "Cost optimization through resource planning"
        ]
    },
    kubernetes: {
        title: "Docker & Kubernetes",
        subtitle: "Container orchestration and deployment",
        description: "Containerization with Docker and orchestration with Kubernetes for scalable, portable, and efficient application deployment. From development to production environments.",
        features: [
            "Docker containerization and optimization",
            "Kubernetes cluster setup and management",
            "Helm charts for application deployment",
            "Service mesh implementation",
            "Container security and monitoring"
        ]
    },
    cicd: {
        title: "CI/CD Pipeline Implementation",
        subtitle: "Automated build, test, and deployment",
        description: "Continuous Integration and Continuous Deployment pipelines using Jenkins, GitHub Actions, GitLab CI, and other modern tools to automate your software delivery process.",
        features: [
            "Jenkins pipeline setup and optimization",
            "GitHub Actions workflow automation",
            "Automated testing integration",
            "Multi-environment deployment strategies",
            "Pipeline monitoring and notifications"
        ]
    },
    automation: {
        title: "DevOps Automation",
        subtitle: "Streamlined development operations",
        description: "End-to-end DevOps automation including configuration management, monitoring, logging, and infrastructure optimization to improve development velocity and system reliability.",
        features: [
            "Ansible configuration management",
            "Monitoring and alerting setup",
            "Log aggregation and analysis",
            "Performance optimization",
            "Security automation and compliance"
        ]
    },
    monitoring: {
        title: "Monitoring & Observability",
        subtitle: "Complete system visibility and insights",
        description: "Comprehensive monitoring and observability solutions using Prometheus, Grafana, ELK stack, and other tools to ensure system health and performance optimization.",
        features: [
            "Prometheus metrics collection",
            "Grafana dashboard creation",
            "ELK stack log management",
            "Application performance monitoring",
            "Custom alerting and notifications"
        ]
    }
};

function openModal(serviceKey) {
    const service = serviceData[serviceKey];
    if (!service) return;

    document.getElementById('modalTitle').textContent = service.title;
    document.getElementById('modalSubtitle').textContent = service.subtitle;
    document.getElementById('modalDescription').textContent = service.description;
    
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = service.features.map(feature => `<li>${feature}</li>`).join('');
    
    const modal = document.getElementById('portfolioModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => modal.style.display = 'none', 300);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio item clicks
    document.querySelectorAll('[data-service]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(this.dataset.service);
        });
    });

    // Close modal events
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    document.querySelector('.modal-overlay').addEventListener('click', closeModal);
    
    // ESC key close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
});