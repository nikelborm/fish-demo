// import type { RelationMapMaximizedType } from './relationMapMaximizedType';

//! if you change this file manually, do it very carefully

// temporary uncomment type to enable intellisense

const RelationMapValue = {
  // const RelationMapValue: RelationMapMaximizedType = {
  AccessScope: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      usersWithThatAccessScope: ['User'],
      userToAccessScopeRelations: ['UserToAccessScope'],
      // AccessScope relationToEntityNameMap token
    },
  },
  UserToAccessScope: {
    identityKeys: ['accessScopeId', 'userId'],
    relationToEntityNameMap: {
      accessScope: 'AccessScope',
      user: 'User',
      // UserToAccessScope relationToEntityNameMap token
    },
  },
  User: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      userToAccessScopeRelations: ['UserToAccessScope'],
      accessScopes: ['AccessScope'],
      taskToReservoir: ['TaskToReservoir'],
      // User relationToEntityNameMap token
    },
  },
  AbstractSensor: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      abstractSensorToSensorInstanceRelations: [
        'AbstractSensorToSensorInstance',
      ],
      sensorParameterInstances: ['SensorParameterInstance'],
      sensorParameters: ['SensorParameter'],
      abstractSensorToSensorParameterRelations: [
        'AbstractSensorToSensorParameter',
      ],
      // AbstractSensor relationToEntityNameMap token
    },
  },
  EventType: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      events: ['Event'],
      // EventType relationToEntityNameMap token
    },
  },
  Reservoir: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      sensorInstances: ['SensorInstance'],
      tasksWithThatReservoir: ['Task'],
      taskToReservoirRelations: ['TaskToReservoir'],
      fishBatch: 'FishBatch',
      events: ['Event'],
      alerts: ['Alert'],
      behaviors: ['Behavior'],
      // Reservoir relationToEntityNameMap token
    },
  },
  SensorInstance: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      abstractSensorToSensorInstance: 'AbstractSensorToSensorInstance',
      reservoir: 'Reservoir',
      sensorParameterInstances: ['SensorParameterInstance'],
      sensorParameters: ['SensorParameter'],
      // SensorInstance relationToEntityNameMap token
    },
  },
  SensorMeasurement: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      sensorParameterInstance: 'SensorParameterInstance',
      // SensorMeasurement relationToEntityNameMap token
    },
  },
  SensorMeasurementConstraint: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      sensorParameterInstance: 'SensorParameterInstance',
      // SensorMeasurementConstraint relationToEntityNameMap token
    },
  },
  SensorParameter: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      sensorInstancesWithThatSensorParameter: ['SensorInstance'],
      sensorParameterInstances: ['SensorParameterInstance'],
      abstractSensorsWithThatSensorParameter: ['AbstractSensor'],
      abstractSensorToSensorParameterRelations: [
        'AbstractSensorToSensorParameter',
      ],
      // SensorParameter relationToEntityNameMap token
    },
  },
  SensorParameterInstance: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      abstractSensor: 'AbstractSensor',
      abstractSensorToSensorInstance: 'AbstractSensorToSensorInstance',
      abstractSensorToSensorParameter: 'AbstractSensorToSensorParameter',
      sensorInstance: 'SensorInstance',
      sensorMeasurementConstraints: ['SensorMeasurementConstraint'],
      sensorMeasurements: ['SensorMeasurement'],
      sensorParameter: 'SensorParameter',
      // SensorParameterInstance relationToEntityNameMap token
    },
  },
  AbstractSensorToSensorInstance: {
    identityKeys: ['abstractSensorId', 'sensorInstanceId'],
    relationToEntityNameMap: {
      abstractSensor: 'AbstractSensor',
      sensorInstance: 'SensorInstance',
      // AbstractSensorToSensorInstance relationToEntityNameMap token
    },
  },
  AbstractSensorToSensorParameter: {
    identityKeys: ['abstractSensorId', 'sensorParameterId'],
    relationToEntityNameMap: {
      abstractSensor: 'AbstractSensor',
      sensorParameterInstances: ['SensorParameterInstance'],
      sensorParameter: 'SensorParameter',
      // AbstractSensorToSensorParameter relationToEntityNameMap token
    },
  },
  FishBatch: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      fishKind: 'FishKind',
      // FishBatch relationToEntityNameMap token
    },
  },
  FishKind: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      // FishKind relationToEntityNameMap token
    },
  },
  BehaviorType: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      behavior: 'Behavior',
      fishInfo: 'FishInfo',
      // BehaviorType relationToEntityNameMap token
    },
  },
  Event: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      eventType: 'EventType',
      reservoir: 'Reservoir',
      // Event relationToEntityNameMap token
    },
  },
  Alert: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      reservoir: 'Reservoir',
      // Alert relationToEntityNameMap token
    },
  },
  Task: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      taskTime: ['TaskTime'],
      reservoirs: ['Reservoir'],
      taskToReservoirRelations: ['TaskToReservoir'],
      // Task relationToEntityNameMap token
    },
  },
  TaskTime: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      task: 'Task',
      // TaskTime relationToEntityNameMap token
    },
  },
  TaskToReservoir: {
    identityKeys: ['taskId', 'reservoirId'],
    relationToEntityNameMap: {
      task: 'Task',
      reservoir: 'Reservoir',
      user: 'User',
      // TaskToReservoir relationToEntityNameMap token
    },
  },
  Behavior: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      behaviorType: 'BehaviorType',
      reservoir: 'Reservoir',
      // Behavior relationToEntityNameMap token
    },
  },
  AlertType: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      // AlertType relationToEntityNameMap token
    },
  },
  FishInfo: {
    identityKeys: ['id'],
    relationToEntityNameMap: {
      behaviorType: 'BehaviorType',
      // FishInfo relationToEntityNameMap token
    },
  },
  // RelationMapValue end token
} as const;

//! Do not remove "Entity relationToEntityNameMap token" and "RelationMapValue end token"
//! because it will break code auto generation

export type RelationMap = typeof RelationMapValue;
