'use client';

import React, { useRef, Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/20/solid';

import { useModalStore } from '@/store/ModalStore';
import { useBoardStore } from '@/store/BoardStore';
import { TaskTypeRadioGroup } from '@/components/TaskTypeRadioGroup';
import * as styles from './index.styles';

export function Modal() {
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const { isOpen, closeModal } = useModalStore();

  const { newTaskInput, setNewTaskInput, image, setImage } = useBoardStore();

  function handleTodoInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTaskInput(e.target.value);
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0].type.startsWith('image/')) return;
    setImage(e.target.files[0]);
  }

  function handleUploadImageClick() {
    imagePickerRef.current?.click();
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTaskInput) return;

    // add task to db

    setImage(null);
    closeModal();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleFormSubmit}
        onClose={closeModal}
        className={styles.modalFormStyles}
      >
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
                    onChange={handleTodoInputChange}
                    placeholder="Enter a task here..."
                    className={styles.dialogInputStyles}
                  />
                </div>

                <TaskTypeRadioGroup />

                <div className={styles.uploadImageWrapperStyles}>
                  <button
                    type="button"
                    onClick={handleUploadImageClick}
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

                <div className={styles.addTaskWrapperStyles}>
                  <button
                    type="submit"
                    disabled={!newTaskInput}
                    className={styles.addTaskButtonStyles}
                  >
                    Add Task
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
