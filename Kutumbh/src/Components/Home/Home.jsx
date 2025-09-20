import React, { useState, useMemo, useRef, useEffect } from "react";
import "./home.css";

function Avatar({ src, alt, size = 40 }) {
  return (
    <img
      src={src}
      alt={alt}
      className="avatar"
      style={{ width: size, height: size }}
    />
  );
}

function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-header">
        <Avatar src={post.avatar} alt={post.author} size={40} />
        <div className="post-meta">
          <div className="post-author">{post.author}</div>
          <div className="post-sub">
            {post.time} · <span>{post.group}</span>
          </div>
        </div>
        <button className="post-more" title="More">
          <i className="fas fa-ellipsis-h" />
        </button>
      </div>

      <div className="post-body">
        <p className="post-text">{post.text}</p>

        {post.images?.length === 1 && (
          <div className="post-image single">
            <img src={post.images[0]} alt={post.imageAlt || "Post image"} />
          </div>
        )}

        {post.images?.length > 1 && (
          <div className="post-gallery">
            {post.images.map((src, i) => (
              <div className="thumb" key={i}>
                <img src={src} alt={`Post image ${i + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="post-actions">
        <button className="action">
          <i className="far fa-thumbs-up" /> <span>Like</span>
        </button>
        <button className="action">
          <i className="far fa-comment" /> <span>Comment</span>
        </button>
        <button className="action">
          <i className="fas fa-share" /> <span>Share</span>
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  // Groups (left)
  const [groups, setGroups] = useState([
    { id: 1, name: "Family Reunion", members: 12 },
    { id: 2, name: "College Friends", members: 8 },
    { id: 3, name: "Neighborhood", members: 5 },
  ]);

  // Stories (static placeholders)
  const stories = useMemo(
    () => [
      { type: "create" },
      {
        title: "Family Picnic",
        cover:
          "https://i.scdn.co/image/ab67616d00001e02d81d2ce86384dc32c168dfe1",
      },
      {
        title: "bhim's Birthday",
        cover:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIHN4sVSYme6PRPqXlImCuDRunI-ERgC6aw&s",
      },
    ],
    []
  );

  // Posts (initial)
  const [posts, setPosts] = useState([
    {
      author: "mukesh ambani",
      time: "2 hrs ago",
      group: "Family Reunion",
      avatar: "https://etimg.etb2bimg.com/photo/81703542.cms",
      text: "hi jalebi fafda",
      images: [
        "https://www.aljazeera.com/wp-content/uploads/2024/07/2024-07-12T114050Z_1940855095_RC2NT8AZOXPJ_RTRMADP_3_INDIA-AMBANI-WEDDING-1720822381.jpg?resize=1800%2C1800",
      ],
      imageAlt: "Family reunion planning sheet",
    },
    {
      author: "chota bheem",
      time: "Yesterday",
      group: "College Friends",
      avatar:
        "https://yt3.googleusercontent.com/xoLuFNh-ghmzHMDKaRs4k4EUl2KPF2eKOMfL854yARi9qLtszlYB-BbCp32-Oa7JmeCoGJpwpw=s900-c-k-c0x00ffffff-no-rj",
      text: "kiramaadaaaa ka vadh",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXpUSR8qosBBIoJnepLW-35wwVkVxRsQI6GA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvU4qQoOzRdO0T9GAAj32cuairpxUi3JEpAw&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7ou7KtjikS5j2ICcRg7xfQobavbO-d11qA&s",
      ],
    },
  ]);

  // Composer state
  const [newPost, setNewPost] = useState("");

  const addPost = () => {
    const content = newPost.trim();
    if (!content) return;
    const newEntry = {
      author: "You",
      time: "Just now",
      group: "Family Reunion",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvU4qQoOzRdO0T9GAAj32cuairpxUi3JEpAw&s",
      text: content,
      images: [],
    };
    setPosts((p) => [newEntry, ...p]);
    setNewPost("");
  };

  // Members and pending (right)
  const [members, setMembers] = useState([
    { id: 1, name: "narendra modi (Admin)", status: "Online" },
    { id: 2, name: "payal", status: "Online" },
    { id: 3, name: "chota bheem", status: "2 hrs ago" },
  ]);
  const [pending, setPending] = useState([{ id: 1, name: "raju" }]);

  const approve = (id) => {
    // move pending -> members (frontend only)
    const req = pending.find((p) => p.id === id);
    if (!req) return;
    setPending((p) => p.filter((r) => r.id !== id));
    setMembers((m) => [
      { id: 1000 + id, name: req.name, status: "Online" },
      ...m,
    ]);
  };

  const decline = (id) => {
    setPending((p) => p.filter((r) => r.id !== id));
  };

  // Create / Join modals
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const createNameRef = useRef(null);
  const joinCodeRef = useRef(null);

  const handleCreate = (e) => {
    e.preventDefault();
    const name = createNameRef.current?.value?.trim();
    if (!name) return;
    setGroups((g) => [...g, { id: Date.now(), name, members: 1 }]);
    setCreateOpen(false);
    // optional: show toast
  };

  const handleJoin = (e) => {
    e.preventDefault();
    const code = (joinCodeRef.current?.value || "").trim();
    if (!code) return alert("Enter a code (UI-only)");
    // simulate join -> add "Joined Group"
    setGroups((g) => [
      ...g,
      { id: Date.now(), name: `Joined ${code}`, members: 1 },
    ]);
    setJoinOpen(false);
  };

  // copy group code toast
  const copyGroupCode = (code) => {
    navigator.clipboard
      ?.writeText(code)
      .then(() => {
        const el = document.createElement("div");
        el.innerText = "Copied!";
        el.className = "copy-toast";
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
      })
      .catch(() => {
        /* ignore */
      });
  };

  // menu/search UI (non-functional)
  const [search, setSearch] = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  useEffect(() => {
    const onDoc = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="app-root">
      {/* header */}
      <header className="topbar">
        <div className="top-inner container">
          <div className="brand-row">
            <div className="brand">KUTUMB</div>
            <nav className="top-nav">
              <a className="nav-link active">Home</a>
              <a className="nav-link">Notifications</a>
              <a className="nav-link">Messages</a>
            </nav>
          </div>

          <div className="top-controls">
            <div className="search-wrapper">
              <i className="fas fa-search" />
              <input
                className="search-input"
                placeholder="Search KUMUTB"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                className="avatar-btn"
                onClick={() => setUserMenuOpen((v) => !v)}
              >
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvU4qQoOzRdO0T9GAAj32cuairpxUi3JEpAw&s"
                  alt="You"
                />
              </button>
              {userMenuOpen && (
                <div className="menu">
                  <div className="menu-item">Your Profile</div>
                  <div className="menu-item">Settings</div>
                  <div
                    className="menu-item"
                    onClick={() => alert("Sign out (UI-only)")}
                  >
                    Sign out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* main grid */}
      <div className="container main-grid">
        {/* left */}
        <aside className="left-col">
          <div className="card groups-card">
            <div className="groups-head">
              <h4>Your Groups</h4>
              <button
                className="link small"
                onClick={() => setCreateOpen(true)}
              >
                <i className="fas fa-plus-circle" /> Create
              </button>
            </div>

            <div className="groups-list">
              {groups.map((g) => (
                <div key={g.id} className="group-row">
                  <div className="group-icon">
                    <i className="fas fa-users" />
                  </div>
                  <div className="group-info">
                    <div className="group-name">{g.name}</div>
                    <div className="group-sub muted">{g.members} members</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="groups-footer">
              <button
                className="btn btn-outline w-full"
                onClick={() => setJoinOpen(true)}
              >
                <i className="fas fa-user-plus" /> Join Group
              </button>
            </div>
          </div>
        </aside>

        {/* center */}
        <main className="center-col">
          <div className="stories-card card">
            <div className="stories-row">
              {stories.map((s, idx) =>
                s.type === "create" ? (
                  <div className="story create" key={idx}>
                    <div className="create-plus">+</div>
                    <div className="story-caption">Create Story</div>
                  </div>
                ) : (
                  <div className="story has-image" key={idx}>
                    <img src={s.cover} alt={s.title} />
                    <div className="story-caption story-caption-bottom">
                      {s.title}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="composer card">
            <div className="composer-top">
              <Avatar
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw7ou7KtjikS5j2ICcRg7xfQobavbO-d11qA&s"
                alt="You"
              />
              <textarea
                className="input composer-input"
                placeholder="What's on your mind?"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            </div>
            <div className="composer-actions">
              <div className="icons muted">
                <button className="icon-btn">
                  <i className="fas fa-image" />
                </button>
                <button className="icon-btn">
                  <i className="fas fa-video" />
                </button>
                <button className="icon-btn">
                  <i className="fas fa-smile" />
                </button>
              </div>
              <button className="btn btn-gradient" onClick={addPost}>
                Post
              </button>
            </div>
          </div>

          <div className="feed card feed-scroll">
            {posts.map((p, i) => (
              <PostCard key={i} post={p} />
            ))}
          </div>
        </main>

        {/* right */}
        <aside className="right-col">
          <div className="card active-group">
            <div className="row space-between mb-3">
              <h4>Active Group: Family Reunion</h4>
              <button className="link small">View All</button>
            </div>

            <div className="members-list">
              {members.map((m) => (
                <div className="member-row" key={m.id}>
                  <div className="member-left">
                    <div className="member-avatar">
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXpUSR8qosBBIoJnepLW-35wwVkVxRsQI6GA&s"
                        alt={m.name}
                      />
                    </div>
                    <div>
                      <div className="member-name">{m.name}</div>
                      <div className="muted text-xs">{m.status}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h5 className="mb-2">Pending Requests</h5>
              {pending.length === 0 ? (
                <div className="muted text-sm">No pending requests</div>
              ) : (
                pending.map((req) => (
                  <div className="pending-row" key={req.id}>
                    <div className="pending-left">
                      <div className="member-avatar">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvU4qQoOzRdO0T9GAAj32cuairpxUi3JEpAw&s"
                          alt={req.name}
                        />
                      </div>
                      <div className="member-name">{req.name}</div>
                    </div>
                    <div className="pending-actions">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => approve(req.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-sm btn-muted"
                        onClick={() => decline(req.id)}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-4 border-top pt-3">
              <h5 className="mb-2">Group Code</h5>
              <div className="group-code">
                <code>#F4M1LY2023</code>
                <button
                  className="icon-btn blue"
                  onClick={() => copyGroupCode("#F4M1LY2023")}
                >
                  <i className="fas fa-copy" />
                </button>
              </div>
              <p className="muted text-xs mt-2">
                Share this code with friends to join this group
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Create modal */}
      {createOpen && (
        <div className="modal-screen">
          <div className="modal-card card">
            <div className="row space-between mb-3">
              <h4>Create New Group</h4>
              <button className="icon-btn" onClick={() => setCreateOpen(false)}>
                <i className="fas fa-times" />
              </button>
            </div>
            <form onSubmit={handleCreate}>
              <label className="label">Group name</label>
              <input
                ref={createNameRef}
                className="input"
                placeholder="New group name"
                required
              />
              <div className="mt-3">
                <button className="btn btn-gradient" type="submit">
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join modal */}
      {joinOpen && (
        <div className="modal-screen">
          <div className="modal-card card">
            <div className="row space-between mb-3">
              <h4>Join Group</h4>
              <button className="icon-btn" onClick={() => setJoinOpen(false)}>
                <i className="fas fa-times" />
              </button>
            </div>
            <form onSubmit={handleJoin}>
              <label className="label">Group code</label>
              <input
                ref={joinCodeRef}
                className="input upper"
                placeholder="e.g. F4M1LY2023"
                required
              />
              <div className="mt-3">
                <button className="btn btn-gradient" type="submit">
                  Request to Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
