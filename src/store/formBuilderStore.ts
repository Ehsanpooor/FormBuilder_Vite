import { create } from 'zustand';
import { FormState, NormalizedFieldData, ColumnName } from '@/types/form-builder';

type DragOverColumn = ColumnName | null;

type FieldsState = FormState['fields'];

interface FormBuilderState {
  // Direct access to fields and meta
  fields: FieldsState;
  title: string;
  description: string;
  activeFieldId: string | null;
  isDragging: boolean;
  dragOverColumn: DragOverColumn;

  // Actions
  setTitle: (title: string) => void;
  setDescription: (desc: string) => void;
  setActiveFieldId: (id: string | null) => void;
  setIsDragging: (isDragging: boolean) => void;
  setDragOverColumn: (column: DragOverColumn) => void;

  addField: (field: Omit<NormalizedFieldData, 'id'>, column: ColumnName) => string;
  updateField: (id: string, updates: Partial<NormalizedFieldData>) => void;
  removeField: (id: string) => void;
  moveField: (id: string, from: ColumnName, to: ColumnName) => void;
  reorderField: (id: string, fromIndex: number, toIndex: number, column: ColumnName) => void;

  resetForm: () => void;
  importForm: (form: Partial<FormState>) => void;
}

const initialFields: FieldsState = {
  byId: {},
  leftColumn: [],
  rightColumn: [],
};

export const useFormBuilderStore = create<FormBuilderState>((set) => ({
  fields: initialFields,
  title: '',
  description: '',
  activeFieldId: null,
  isDragging: false,
  dragOverColumn: null,

  setTitle: (title) => set({ title }),
  setDescription: (description) => set({ description }),
  setActiveFieldId: (id) => set({ activeFieldId: id }),
  setIsDragging: (isDragging) => set({ isDragging }),
  setDragOverColumn: (column) => set({ dragOverColumn: column }),

  addField: (field, column) => {
    const id = crypto.randomUUID();
    const newField = { ...field, id };
    set((state) => {
      const newState = {
        fields: {
          ...state.fields,
          byId: {
            ...state.fields.byId,
            [id]: newField,
          },
          [column === 'left' ? 'leftColumn' : 'rightColumn']: [
            ...state.fields[column === 'left' ? 'leftColumn' : 'rightColumn'],
            id,
          ],
        },
      };
      return newState;
    });
    return id;
  },

  updateField: (id, updates) => {
    set((state) => {
      if (!state.fields.byId[id]) return state;
      return {
        fields: {
          ...state.fields,
          byId: {
            ...state.fields.byId,
            [id]: { ...state.fields.byId[id], ...updates },
          },
        },
      };
    });
  },

  removeField: (id) => {
    set((state) => {
      const { [id]: _, ...rest } = state.fields.byId;
      return {
        fields: {
          ...state.fields,
          byId: rest,
          leftColumn: state.fields.leftColumn.filter((fieldId) => fieldId !== id),
          rightColumn: state.fields.rightColumn.filter((fieldId) => fieldId !== id),
        },
      };
    });
  },

  moveField: (id, from, to) => {
    if (from === to) return;
    set((state) => {
      const fromCol = from === 'left' ? 'leftColumn' : 'rightColumn';
      const toCol = to === 'left' ? 'leftColumn' : 'rightColumn';
      return {
        fields: {
          ...state.fields,
          [fromCol]: state.fields[fromCol].filter((fieldId) => fieldId !== id),
          [toCol]: [...state.fields[toCol], id],
        },
      };
    });
  },

  reorderField: (id, fromIndex, toIndex, column) => {
    set((state) => {
      const col = column === 'left' ? 'leftColumn' : 'rightColumn';
      const arr = [...state.fields[col]];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, id);
      return {
        fields: {
          ...state.fields,
          [col]: arr,
        },
      };
    });
  },

  resetForm: () => {
    set({
      fields: initialFields,
      title: '',
      description: '',
      activeFieldId: null,
    });
  },

  importForm: (form) => {
    set((state) => ({
      fields: form.fields || initialFields,
      title: form.title ?? state.title,
      description: form.description ?? state.description,
    }));
  },
})); 