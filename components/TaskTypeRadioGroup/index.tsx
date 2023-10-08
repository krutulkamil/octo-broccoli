'use client';

import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

import { useBoardStore } from '@/store/BoardStore';
import { cn } from '@/utils/cn';
import type { TTypedColumn } from '@/types/todos';
import * as styles from './index.styles';

const taskTypes = [
  {
    id: 'todo',
    name: 'Todo',
    description: 'A new task to be completed',
    color: styles.todoStyles,
  },
  {
    id: 'inprogress',
    name: 'In Progress',
    description: 'A task that is currently being worked on',
    color: styles.inprogressStyles,
  },
  {
    id: 'done',
    name: 'Done',
    description: 'A task that has been completed',
    color: styles.doneStyles,
  },
] as const;

export function TaskTypeRadioGroup() {
  const { newTaskType, setNewTaskType } = useBoardStore();

  function handleRadioChange(type: TTypedColumn) {
    setNewTaskType(type);
  }

  return (
    <div className={styles.mainWrapperStyles}>
      <div className={styles.centerWrapperStyles}>
        <RadioGroup value={newTaskType} onChange={handleRadioChange}>
          <div className={styles.radioInnerWrapperStyles}>
            {taskTypes.map((taskType) => (
              <RadioGroup.Option
                key={taskType.id}
                value={taskType.id}
                className={({ active, checked }) =>
                  cn(
                    active && styles.radioIsActiveStyles,
                    checked
                      ? cn(taskType.color, styles.radioIsCheckedStyles)
                      : styles.radioIsNotCheckedStyles,
                    styles.radioOptionStyles
                  )
                }
              >
                {({ checked }) => (
                  <>
                    <div className={styles.optionFlexStyles}>
                      <div className={styles.optionCenterStyles}>
                        <div className={styles.optionTextSmStyles}>
                          <RadioGroup.Label
                            as="p"
                            className={cn(
                              styles.labelStyles,
                              checked
                                ? styles.labelCheckedStyles
                                : styles.labelNotCheckedStyles
                            )}
                          >
                            {taskType.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={cn(
                              styles.descriptionStyles,
                              checked
                                ? styles.descriptionCheckedStyles
                                : styles.descriptionNotCheckedStyles
                            )}
                          >
                            <span>{taskType.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className={styles.iconWrapperStyles}>
                          <CheckCircleIcon className={styles.checkIconStyles} />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
