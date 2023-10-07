'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { useModalStore } from '@/store/ModalStore';
import * as styles from './index.styles';

export function Modal() {
  const { isOpen, closeModal, newTaskInput, setNewTaskInput } = useModalStore();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskInput(e.target.value);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="form" onClose={closeModal} className={styles.modalFormStyles}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles.backdropStyles} />
        </Transition.Child>

        <div className={styles.overflowWrapperStyles}>
          <div className={styles.transitionWrapperStyles}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className={styles.dialogPanelStyles}>
                <Dialog.Title as="h3" className={styles.dialogTitleStyles}>
                  Add a Task
                </Dialog.Title>

                <div className={styles.dialogInputMarginStyles}>
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={handleInputChange}
                    placeholder="Enter a task here..."
                    className={styles.dialogInputStyles}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
