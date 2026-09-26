<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePosts } from '../composables/usePosts'
import type { Post, PostInput } from '../types/post'

// 1. Consume the Composable
const {
  posts,
  isLoading,
  isSubmitting,
  deletingId,
  error,
  notification,
  activePost,
  comments,
  isLoadingComments,
  logs,
  fetchPosts,
  viewPost,
  createPost,
  updatePost,
  deletePost,
  clearActivePost,
} = usePosts()

// Local UI Form State
const isEditing = ref<boolean>(false)
const editingPostId = ref<number | null>(null)
const formData = ref<PostInput>({
  title: '',
  body: '',
  userId: 1,
})

// Search & Limit
const searchQuery = ref<string>('')
const limit = ref<number>(8)

function startEdit(post: Post) {
  isEditing.value = true
  editingPostId.value = post.id
  formData.value = {
    title: post.title,
    body: post.body,
    userId: post.userId,
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function resetForm() {
  isEditing.value = false
  editingPostId.value = null
  formData.value = {
    title: '',
    body: '',
    userId: 1,
  }
}

async function handleFormSubmit() {
  if (isEditing.value && editingPostId.value) {
    const ok = await updatePost(editingPostId.value, formData.value)
    if (ok) resetForm()
  } else {
    const ok = await createPost(formData.value)
    if (ok) resetForm()
  }
}

const filteredPosts = computed(() => {
  if (!searchQuery.value.trim()) return posts.value
  const q = searchQuery.value.toLowerCase()
  return posts.value.filter((p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q))
})

// Initial fetch on mount
onMounted(() => {
  fetchPosts(limit.value)
})
</script>

<template>
  <div class="space-y-8">
    <!-- Feedback Notifications -->
    <div
      v-if="notification"
      class="bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl flex items-center justify-between transition-all"
    >
      <div class="flex items-center gap-2">
        <span class="text-emerald-400 font-bold">✓</span>
        <span>{{ notification }}</span>
      </div>
      <button @click="notification = null" class="text-xs text-emerald-400 hover:text-white cursor-pointer">
        Dismiss
      </button>
    </div>

    <div
      v-if="error"
      class="bg-rose-500/15 border border-rose-500/30 text-rose-300 px-4 py-3 rounded-xl flex items-center justify-between transition-all"
    >
      <div class="flex items-center gap-2">
        <span class="text-rose-400 font-bold">✕</span>
        <span>{{ error }}</span>
      </div>
      <button @click="error = null" class="text-xs text-rose-400 hover:text-white cursor-pointer">
        Dismiss
      </button>
    </div>

    <!-- Top Action Bar: Create / Edit Form Card -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div class="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div class="flex items-center gap-2">
          <span
            class="w-2.5 h-2.5 rounded-full"
            :class="isEditing ? 'bg-amber-400 animate-pulse' : 'bg-indigo-400'"
          ></span>
          <h2 class="text-lg font-bold text-white">
            {{ isEditing ? `Edit Post #${editingPostId}` : 'Create New Post' }}
          </h2>
        </div>
        <span class="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          usePosts() Composable
        </span>
      </div>

      <form @submit.prevent="handleFormSubmit" class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Post Title</label>
          <input
            v-model="formData.title"
            type="text"
            required
            placeholder="e.g., Clean Architecture with Vue Composables..."
            class="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-medium text-slate-300 mb-1">Post Body</label>
          <textarea
            v-model="formData.body"
            rows="3"
            required
            placeholder="Write post content here..."
            class="w-full bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <div class="flex items-center justify-between pt-2">
          <div class="text-xs text-slate-500">
            Handled by: <code class="text-indigo-400">usePosts().{{ isEditing ? 'updatePost()' : 'createPost()' }}</code>
          </div>

          <div class="flex items-center gap-2">
            <button
              v-if="isEditing"
              type="button"
              @click="resetForm"
              class="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Cancel Edit
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-5 py-2 text-sm font-semibold rounded-lg text-white transition-all cursor-pointer flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              :class="
                isEditing
                  ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20'
              "
            >
              <span
                v-if="isSubmitting"
                class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></span>
              <span>{{ isSubmitting ? 'Saving...' : isEditing ? 'Update Post (PUT)' : 'Create Post (POST)' }}</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Controls, Posts Grid, and Live Log Stream -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Search & Posts Grid -->
      <div class="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="relative w-full sm:w-72">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Filter loaded posts..."
              class="w-full bg-slate-950 border border-slate-800 focus:border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none"
            />
            <span class="absolute left-2.5 top-2 text-slate-500 text-xs">🔍</span>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div class="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Limit:</span>
              <select
                v-model.number="limit"
                @change="fetchPosts(limit)"
                class="bg-slate-950 border border-slate-800 text-slate-300 rounded px-2 py-1 text-xs outline-none"
              >
                <option :value="5">5</option>
                <option :value="8">8</option>
                <option :value="15">15</option>
                <option :value="25">25</option>
              </select>
            </div>

            <button
              @click="fetchPosts(limit)"
              :disabled="isLoading"
              class="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors flex items-center gap-1.5 border border-slate-700 cursor-pointer disabled:opacity-50"
            >
              <span :class="{ 'animate-spin': isLoading }">↻</span>
              <span>Refetch (usePosts)</span>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="py-16 text-center space-y-3">
          <div class="inline-block w-8 h-8 border-3 border-indigo-500/20 border-t-indigo-400 rounded-full animate-spin"></div>
          <p class="text-xs text-slate-400">Loading through <code>usePosts().fetchPosts()</code>...</p>
        </div>

        <div v-else-if="filteredPosts.length === 0" class="py-12 text-center text-slate-500 text-xs">
          No posts matching your search query.
        </div>

        <!-- Posts Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="post in filteredPosts"
            :key="post.id"
            class="bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between transition-all group hover:shadow-md"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span class="text-indigo-400 font-semibold">#{{ post.id }}</span>
                <span>User: {{ post.userId }}</span>
              </div>
              <h3 class="text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                {{ post.title }}
              </h3>
              <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                {{ post.body }}
              </p>
            </div>

            <!-- Card Actions -->
            <div class="flex items-center justify-between pt-4 mt-3 border-t border-slate-800/60 text-xs">
              <button
                @click="viewPost(post)"
                class="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer transition-colors"
              >
                Comments →
              </button>

              <div class="flex items-center gap-2">
                <button
                  @click="startEdit(post)"
                  class="px-2 py-1 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-slate-700 transition-colors cursor-pointer"
                >
                  Edit
                </button>
                <button
                  @click="deletePost(post.id)"
                  :disabled="deletingId === post.id"
                  class="px-2 py-1 text-[11px] font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded transition-colors cursor-pointer disabled:opacity-50"
                >
                  <span v-if="deletingId === post.id">...</span>
                  <span v-else>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Network Request Activity Log Stream -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Composable Network Stream
            </h3>
            <span class="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Stateful Logger
            </span>
          </div>

          <div v-if="logs.length === 0" class="text-xs text-slate-500 py-8 text-center">
            No requests executed yet.
          </div>

          <div v-else class="space-y-2.5">
            <div
              v-for="log in logs"
              :key="log.id"
              class="bg-slate-950 p-2.5 rounded-lg border text-xs font-mono space-y-1"
              :class="log.isError ? 'border-rose-900/60' : 'border-slate-800'"
            >
              <div class="flex items-center justify-between">
                <span
                  class="font-bold text-[10px] px-1.5 py-0.5 rounded"
                  :class="{
                    'bg-sky-500/20 text-sky-400': log.method === 'GET',
                    'bg-emerald-500/20 text-emerald-400': log.method === 'POST',
                    'bg-amber-500/20 text-amber-400': log.method === 'PUT',
                    'bg-rose-500/20 text-rose-400': log.method === 'DELETE',
                  }"
                >
                  {{ log.method }}
                </span>
                <span
                  class="text-[10px] font-semibold"
                  :class="log.isError ? 'text-rose-400' : 'text-emerald-400'"
                >
                  HTTP {{ log.status ?? 'ERR' }} · {{ log.durationMs }}ms
                </span>
              </div>
              <div class="text-[10px] text-slate-400 truncate">
                {{ log.url }}
              </div>
              <div class="text-[9px] text-slate-600 text-right">
                {{ log.timestamp }}
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 mt-4 text-[11px] text-slate-400 space-y-1">
          <p class="font-semibold text-indigo-300">Why Composable Flow wins:</p>
          <ul class="list-disc list-inside space-y-0.5 text-[10px] text-slate-500">
            <li>Zero fetch boilerplate in components</li>
            <li>Centralized AbortController & error handling</li>
            <li>Fully reusable across any view or store</li>
            <li>Unit-testable without mounting DOM</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Post Details & Comments Modal -->
    <div
      v-if="activePost"
      class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div
        class="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        <div class="p-5 border-b border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-indigo-400">Post #{{ activePost.id }}</span>
            <h3 class="text-sm font-bold text-white truncate max-w-md">
              {{ activePost.title }}
            </h3>
          </div>
          <button
            @click="clearActivePost"
            class="text-slate-400 hover:text-white text-sm font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div class="p-5 overflow-y-auto space-y-5 text-xs">
          <!-- Body -->
          <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
            {{ activePost.body }}
          </div>

          <!-- Comments Section -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
                Comments ({{ comments.length }})
              </h4>
              <span class="text-[10px] text-indigo-400 font-mono">
                usePosts().comments
              </span>
            </div>

            <div v-if="isLoadingComments" class="py-6 text-center text-slate-500">
              <div class="inline-block w-5 h-5 border-2 border-indigo-400/20 border-t-indigo-400 rounded-full animate-spin mb-2"></div>
              <div>Fetching comments...</div>
            </div>

            <div v-else-if="comments.length === 0" class="text-slate-500 text-center py-4">
              No comments found for this post.
            </div>

            <div v-else class="space-y-3">
              <div
                v-for="comment in comments"
                :key="comment.id"
                class="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80 space-y-1.5"
              >
                <div class="flex items-center justify-between text-[11px]">
                  <span class="font-semibold text-slate-200">{{ comment.name }}</span>
                  <span class="text-slate-500 font-mono text-[10px]">{{ comment.email }}</span>
                </div>
                <p class="text-slate-400 leading-normal">{{ comment.body }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button
            @click="clearActivePost"
            class="px-4 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
