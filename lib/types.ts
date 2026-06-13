// SentinelOS — Core Type Definitions

export type CertificationLevel = 'unverified' | 'basic' | 'standard' | 'advanced' | 'sovereign';
export type AgentStatus = 'active' | 'suspended' | 'pending' | 'deprecated' | 'quarantined';
export type ThreatSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';
export type PermissionStatus = 'granted' | 'denied' | 'blocked' | 'pending' | 'expired';
export type GovernanceDecision = 'approved' | 'blocked' | 'escalated' | 'reviewed' | 'pending';
export type CertificationStage =
  | 'submission'
  | 'static_analysis'
  | 'dependency_inspection'
  | 'permission_review'
  | 'security_scan'
  | 'behavioral_testing'
  | 'injection_testing'
  | 'stress_testing'
  | 'trust_scoring'
  | 'governance_scoring'
  | 'report_generation'
  | 'approval_decision';

export interface Agent {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  developer: string;
  developerAvatar: string;
  version: string;
  category: AgentCategory;
  trustScore: number;
  governanceScore: number;
  certificationLevel: CertificationLevel;
  status: AgentStatus;
  riskLevel: RiskLevel;
  requiredPermissions: Permission[];
  pricing: AgentPricing;
  ratings: number;
  reviewCount: number;
  subscribers: number;
  monthlyActiveUsers: number;
  tags: string[];
  capabilities: string[];
  createdAt: string;
  updatedAt: string;
  lastAuditAt: string;
  icon: string;
  color: string;
}

export type AgentCategory =
  | 'disaster_intelligence'
  | 'cyber_defense'
  | 'research_intelligence'
  | 'healthcare'
  | 'financial'
  | 'productivity'
  | 'data_analytics'
  | 'security'
  | 'compliance'
  | 'communications';

export interface Permission {
  id: string;
  name: string;
  type: PermissionType;
  scope: string;
  risk: RiskLevel;
  status: PermissionStatus;
}

export type PermissionType =
  | 'email'
  | 'calendar'
  | 'files'
  | 'database'
  | 'cloud_storage'
  | 'payment'
  | 'external_api'
  | 'messaging'
  | 'network'
  | 'memory'
  | 'execution';

export interface AgentPricing {
  model: 'free' | 'subscription' | 'usage' | 'enterprise';
  monthly?: number;
  annual?: number;
  perCall?: number;
  currency: string;
}

export interface ThreatEvent {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  type: ThreatType;
  severity: ThreatSeverity;
  description: string;
  sourceIp?: string;
  targetResource?: string;
  blocked: boolean;
  location?: { lat: number; lng: number; country: string };
  vector?: string;
  indicators?: string[];
}

export type ThreatType =
  | 'prompt_injection'
  | 'data_exfiltration'
  | 'privilege_escalation'
  | 'unauthorized_access'
  | 'suspicious_api'
  | 'excessive_tool_usage'
  | 'credential_leakage'
  | 'memory_manipulation'
  | 'agent_abuse';

export interface GovernanceAction {
  id: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  action: string;
  permission: string;
  context: string;
  riskScore: number;
  policy: string;
  decision: GovernanceDecision;
  status: 'completed' | 'pending' | 'reviewing';
  masterAgentOverride: boolean;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  category: 'auth' | 'agent' | 'governance' | 'permission' | 'certification' | 'system';
  severity: ThreatSeverity;
  actor: string;
  actorType: 'user' | 'agent' | 'system' | 'master_agent';
  action: string;
  resource: string;
  outcome: 'success' | 'failure' | 'blocked';
  metadata: Record<string, unknown>;
  correlationId?: string;
}

export interface DashboardMetrics {
  registeredAgents: number;
  certifiedAgents: number;
  pendingReviews: number;
  threatsBlocked: number;
  permissionViolations: number;
  activeSessions: number;
  trustIndex: number;
  governanceScore: number;
  platformHealth: number;
  agentRevenue: number;
}

export interface CertificationJob {
  id: string;
  agentId: string;
  agentName: string;
  submittedAt: string;
  completedAt?: string;
  currentStage: CertificationStage;
  stages: CertificationStageResult[];
  trustScore?: number;
  governanceScore?: number;
  decision?: 'approved' | 'rejected' | 'conditional';
  report?: string;
}

export interface CertificationStageResult {
  stage: CertificationStage;
  status: 'pending' | 'running' | 'passed' | 'failed' | 'warning';
  score?: number;
  findings: string[];
  duration?: number;
  completedAt?: string;
}

export interface MasterAgentDecision {
  id: string;
  timestamp: string;
  type: 'block' | 'approve' | 'escalate' | 'quarantine' | 'alert';
  reasoning: string;
  agentId: string;
  agentName: string;
  confidence: number;
  policyApplied: string;
  outcome: string;
}

export interface NetworkNode {
  id: string;
  label: string;
  type: 'user' | 'master_agent' | 'agent' | 'resource' | 'threat';
  status: 'active' | 'inactive' | 'threat' | 'blocked';
  x?: number;
  y?: number;
}

export interface NetworkLink {
  source: string;
  target: string;
  type: 'trusted' | 'monitored' | 'blocked' | 'threat';
  weight: number;
}
