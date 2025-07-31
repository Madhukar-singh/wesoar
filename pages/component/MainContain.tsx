import React, { useState, useMemo, MouseEvent, ChangeEvent } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Button,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Target,
  Heart,
  ShoppingCart,
} from "lucide-react";

type SkillLanguage = {
  code: string;
  string: string;
};

type SkillRating = {
  assessmentGroup: string;
};

type SkillCategory = {
  name: string;
};

type Skill = {
  _id: string;
  name: string;
  keyName: string;
  description: string;
  skillCategory: SkillCategory;
  languageName: SkillLanguage[];
  overallAvgRatingForUserId: number;
  ratings: SkillRating[];
};

type SkillDataItem = {
  skill: Skill;
  // Add other properties as needed
};

interface SkillsFilterComponentProps {
  skillsData: SkillDataItem[];
}

export default function SkillsFilterComponent({
  skillsData,
}: SkillsFilterComponentProps) {
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [ratingRange, setRatingRange] = useState([1, 5]);
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<
    string[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [anchorEl, setAnchorEl] = useState(null);

  // Get unique categories from skills data
  const categories = useMemo(() => {
    const cats = skillsData.map((item) => item.skill.skillCategory.name);
    return ["All", ...new Set(cats)];
  }, []);

  // Get unique languages
  const languages = ["All", "English", "Arabic"];

  // Assessment types
  const assessmentTypes = ["SELF", "DIRECT_MANAGER", "PEER", "SUBORDINATE"];

  // Filter skills based on current filters
  const filteredSkills = useMemo(() => {
    return skillsData.filter((item) => {
      const skill = item.skill;

      // Category filter
      if (
        selectedCategories.length > 0 &&
        !selectedCategories.includes("All")
      ) {
        if (!selectedCategories.includes(skill.skillCategory.name)) {
          return false;
        }
      }

      // Rating filter
      if (
        skill.overallAvgRatingForUserId < ratingRange[0] ||
        skill.overallAvgRatingForUserId > ratingRange[1]
      ) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== "All") {
        const hasLanguage = skill.languageName.some(
          (lang) =>
            (selectedLanguage === "English" && lang.code === "en") ||
            (selectedLanguage === "Arabic" && lang.code === "ar")
        );
        if (!hasLanguage) return false;
      }

      // Assessment type filter
      if (selectedAssessmentType.length > 0) {
        const hasAssessmentType = skill.ratings.some((rating) =>
          selectedAssessmentType.includes(rating.assessmentGroup)
        );
        if (!hasAssessmentType) return false;
      }

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        if (
          !skill.name.toLowerCase().includes(searchLower) &&
          !skill.description.toLowerCase().includes(searchLower) &&
          !skill.keyName.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    skillsData,
    selectedCategories,
    ratingRange,
    selectedLanguage,
    selectedAssessmentType,
    searchTerm,
  ]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSkills = filteredSkills.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handler functions
  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== value));
    }
    setCurrentPage(1);
  };

  const handleAssessmentTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedAssessmentType((prev: string[]) => [...prev, value]);
    } else {
      setSelectedAssessmentType((prev: string[]) =>
        prev.filter((type) => type !== value)
      );
    }
    setCurrentPage(1);
  };

  const handleShowingClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleShowingClose = (value?: number) => {
    setAnchorEl(null);
    if (value) {
      setItemsPerPage(value);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div>
      <Box className="flex flex-col lg:flex-row p-4 min-h-screen container mx-auto border-none mt-8">
        {/* Left Filter Panel */}
        <Box className="w-full lg:w-1/4 bg-white rounded-lg border border-gray-300 rounded-xl p-6 mb-6 lg:mb-0 lg:mr-6">
          <Typography variant="h6" className="font-bold mb-6 text-gray-800">
            Filter Skills
          </Typography>

          {/* Search */}
          <Box className="mb-6">
            <Typography
              variant="subtitle1"
              className="font-semibold mb-3 text-gray-700"
            >
              Search
            </Typography>
            <TextField
              fullWidth
              size="small"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-50 rounded-md"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#d1d5db" },
                  "&:hover fieldset": { borderColor: "#9ca3af" },
                  "&.Mui-focused fieldset": { borderColor: "#2563EB" },
                  backgroundColor: "#f9fafb",
                },
              }}
            />
          </Box>

          {/* Skill Categories */}
          <Box className="mb-6">
            <Typography
              variant="subtitle1"
              className="font-semibold mb-3 text-gray-700"
            >
              Skill Categories
            </Typography>
            {categories.map((category) => (
              <div key={category}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={category}
                      checked={selectedCategories.includes(category)}
                      onChange={handleCategoryChange}
                      sx={{
                        color: "#60A5FA",
                        "&.Mui-checked": { color: "#2563EB" },
                      }}
                    />
                  }
                  label={
                    <Typography className="text-gray-700 text-sm">
                      {category}
                    </Typography>
                  }
                />
              </div>
            ))}
          </Box>

          {/* Rating Range */}
          <Box className="mb-6">
            <Typography
              variant="subtitle1"
              className="font-semibold mb-3 text-gray-700"
            >
              Rating Range
            </Typography>
            <Slider
              value={ratingRange}
              onChange={(e, newValue) => {
                setRatingRange(newValue);
                setCurrentPage(1);
              }}
              valueLabelDisplay="auto"
              min={1}
              max={5}
              step={1}
              marks={[
                { value: 1, label: "1" },
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
              ]}
              className="w-full mt-4"
              sx={{
                color: "#2563EB",
                "& .MuiSlider-thumb": {
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0px 0px 0px 8px rgba(37, 99, 235, 0.16)",
                  },
                  "&.Mui-active": {
                    boxShadow: "0px 0px 0px 14px rgba(37, 99, 235, 0.16)",
                  },
                },
              }}
            />
          </Box>

          {/* Language */}
          <Box className="mb-6">
            <Typography
              variant="subtitle1"
              className="font-semibold mb-3 text-gray-700"
            >
              Language
            </Typography>
            <RadioGroup
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setCurrentPage(1);
              }}
            >
              {languages.map((language) => (
                <FormControlLabel
                  key={language}
                  value={language}
                  control={
                    <Radio
                      sx={{
                        color: "#60A5FA",
                        "&.Mui-checked": { color: "#2563EB" },
                      }}
                    />
                  }
                  label={
                    <Typography className="text-gray-700 text-sm">
                      {language}
                    </Typography>
                  }
                />
              ))}
            </RadioGroup>
          </Box>

          <Box className="mb-6">
            <Typography
              variant="subtitle1"
              className="font-semibold mb-3 text-gray-700"
            >
              Assessment Type
            </Typography>
            {assessmentTypes.map((type) => (
              <div key={type}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={type}
                      checked={selectedAssessmentType.includes(type)}
                      onChange={handleAssessmentTypeChange}
                      sx={{
                        color: "#60A5FA",
                        "&.Mui-checked": { color: "#2563EB" },
                      }}
                    />
                  }
                  label={
                    <Typography className="text-gray-700 text-sm">
                      {type.replace("_", " ")}
                    </Typography>
                  }
                />
              </div>
            ))}
          </Box>

          {/* Clear Filters */}
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setSelectedCategories([]);
              setRatingRange([1, 5]);
              setSelectedLanguage("All");
              setSelectedAssessmentType([]);
              setSearchTerm("");
              setCurrentPage(1);
            }}
            className="normal-case text-gray-700 border-gray-300 hover:bg-gray-50"
          >
            Clear All Filters
          </Button>
        </Box>

        {/* Right Skills Listing Section */}
        <Box className="flex-grow w-full lg:w-3/4 bg-white p-6">
          {/* Results Summary */}
          <Box className="mb-4 flex justify-between items-center">
            <Typography variant="h6" className="text-gray-800">
              Skills ({filteredSkills.length} found)
            </Typography>
          </Box>
          <div className="flex flex-wrap -mx-4">
            {paginatedSkills.map((item) => {
              const skill = item.skill;
              const englishName =
                skill.languageName.find((lang) => lang.code === "en")?.string ||
                skill.name;

              return (
                <div key={skill._id} className="w-full sm:w-1/2 md:w-1/3 p-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl border-none bg-white flex flex-col h-full">
                    {/* Top image + tags */}
                    <div
                      className="relative h-40 bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                      }}
                    >
                      <div className="absolute top-2 left-2 flex gap-1">
                        <span className="text-xs px-2 py-1 rounded bg-cyan-100 text-cyan-800">
                          Ind
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-800">
                          Org
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-center mb-2 text-xs">
                        <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          English
                        </span>
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                          {skill.deliveryMethod || "Blended"}
                        </span>
                        <span className="text-blue-600 font-semibold">
                          New!
                        </span>
                      </div>

                      <h3 className="text-gray-800 font-semibold text-md mb-1 leading-snug">
                        {englishName}
                      </h3>

                      <p className="text-gray-500 text-sm mb-1">
                        {skill.category || "Insurance - Banking"}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">
                        {skill.duration || "3 weeks"}
                      </p>

                      <div className="flex items-center text-sm mb-2">
                        {renderStars(skill.overallAvgRatingForUserId)}
                        <span className="ml-2 text-gray-700 font-medium">
                          {skill.overallAvgRatingForUserId}/5
                        </span>
                      </div>

                      <div className="text-primary font-bold text-lg mb-2 text-blue-600">
                        {skill.price || "684,000"}{" "}
                        <span className="text-sm font-medium text-gray-700">
                          SAR
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm mb-3">
                        <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                          {skill.startDate || "Feb 29, 2024"}
                        </span>
                        <span className="text-green-600 font-medium">
                          Opening Soon
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <button className="text-gray-400 hover:text-blue-600">
                          <Heart size={18} />
                        </button>
                        <button className="w-full ml-2 flex items-center justify-center gap-2 bg-[#5091CD] cursor-pointer hover:bg-blue-400 text-white text-sm py-2 px-4 rounded-full font-medium">
                          Add to Cart
                          <ShoppingCart size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {filteredSkills.length === 0 && (
            <Box className="text-center py-12">
              <Target size={64} className="mx-auto text-gray-400 mb-4" />
              <Typography variant="h6" className="text-gray-600 mb-2">
                No skills found
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Try adjusting your filters to see more results
              </Typography>
            </Box>
          )}

          {/* Pagination and Showing Options */}
          {filteredSkills.length > 0 && (
            <Box className="flex flex-col sm:flex-row justify-between items-center mt-8">
              <Stack spacing={2} direction="row" alignItems="center">
                <Typography variant="body2" className="text-gray-600">
                  Showing
                </Typography>
                <Button
                  variant="outlined"
                  onClick={handleShowingClick}
                  endIcon={<ChevronDown size={16} />}
                  className="normal-case text-gray-700 border-gray-300 hover:bg-gray-50 rounded-md px-3 py-1"
                >
                  {itemsPerPage}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleShowingClose()}
                >
                  {[6, 9, 12, 18].map((count) => (
                    <MenuItem
                      key={count}
                      onClick={() => handleShowingClose(count)}
                    >
                      {count}
                    </MenuItem>
                  ))}
                </Menu>
                <Typography variant="body2" className="text-gray-600">
                  skills out of {filteredSkills.length}
                </Typography>
              </Stack>

              {/* Custom Pagination */}
              <Box className="flex items-center space-x-1 mt-4 sm:mt-0">
                <IconButton
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2"
                >
                  <ChevronLeft size={16} />
                </IconButton>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-0 px-3 py-1 mx-0.5 rounded-md ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <IconButton
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2"
                >
                  <ChevronRight size={16} />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}
