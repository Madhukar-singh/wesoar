import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Main from "./component/MainContain";
import { LoaderCircle } from "lucide-react";

const GET_USER = gql`
  query user($id: ObjectID!) {
    user(id: $id) {
      _id: id
      firstName
      lastName
      designation
      jobRoleId
      jobRole {
        _id: id
        name
        jobRoleVLevel
        languageName {
          code
          string
          __typename
        }
        keyName
        jobFamily {
          _id: id
          name
          languageName {
            code
            string
            __typename
          }
          __typename
        }
        linkedSkills {
          skill {
            _id: id
            name
            languageName {
              code
              string
              __typename
            }
            keyName
            description
            assessmentGroupAvgRatingsForUserId(userId: $id)
            overallAvgRatingForUserId(userId: $id)
            languageDescription {
              code
              string
              __typename
            }
            ratings {
              _id: id
              assessmentGroup
              assessedByUserId
              assessmentForUserId
              skillId
              rating
              __typename
            }
            skillCategory {
              _id: id
              name
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      userProfile {
        skills {
          _id: id
          name
          languageName {
            code
            string
            __typename
          }
          assessmentGroupAvgRatingsForUserId(userId: $id)
          overallAvgRatingForUserId(userId: $id)
          keyName
          description
          languageDescription {
            code
            string
            __typename
          }
          jobRoles {
            _id: id
            name
            languageName {
              code
              string
              __typename
            }
            __typename
          }
          relatedSkills {
            _id: id
            name
            languageName {
              code
              string
              __typename
            }
            __typename
          }
          ratings {
            _id: id
            assessmentGroup
            assessedByUserId
            assessmentForUserId
            skillId
            rating
            __typename
          }
          skillCategory {
            _id: id
            name
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
  }
`;

const USER_ID = "61ec5a7da292c106d6f6146d";

export default function UserPage() {
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: USER_ID },
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Please wait Loading...
        <LoaderCircle className="w-6 h-6 text-gray-500 animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        Error: {error.message}
      </div>
    );

  const linkedSkills = data?.user?.jobRole?.linkedSkills;

  return (
    <div>
      <Header />
      <Main skillsData={linkedSkills} />
      <Footer />
    </div>
  );
}
