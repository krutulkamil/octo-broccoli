'use client';

import React, { useRef, Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/20/solid';

import { useModalStore } from '@/store/ModalStore';
import * as styles from './index.styles';
import { TaskTypeRadioGroup } from '@/components/TaskTypeRadioGroup';

export function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const { isOpen, closeModal, newTaskInput, setNewTaskInput, image, setImage } =
    useModalStore();

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskInput(e.target.value);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0].type.startsWith('image/')) return;
    setImage(e.target.files[0]);
  }

  function handleClickButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    imagePickerRef.current?.click();
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

                <TaskTypeRadioGroup />

                <div>
                  <button
                    onClick={handleClickButtonClick}
                    className={styles.uploadImageButtonStyles}
                  >
                    <PhotoIcon className={styles.uploadImageIconStyles} />
                    Upload Image
                  </button>

                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Image"
                      width={200}
                      height={200}
                      className={styles.dialogImageStyles}
                      onClick={() => setImage(null)}
                    />
                  )}

                  <input
                    type="file"
                    ref={imagePickerRef}
                    hidden
                    onChange={handleImageChange}
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
